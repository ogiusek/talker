import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import messeageStyle from "./messeage/style.module.scss";

import { AuthContext, addSocketEvent, notificate, restUrl, sendSocket } from "src/utils";
import { SendMesseage } from "./sendMesseage";
import { Messeage } from "./messeage";

interface Props {
  talker: Number,
  talkerName: String,
  setTalker: React.Dispatch<React.SetStateAction<Number>>
}

function Messeages({ talkerName, talker, setTalker }: Props) {
  const ctx = React.useContext(AuthContext);
  const scrollRef = useRef<HTMLElement>(null);
  const [lastScroll, setLastScroll] = useState(new Date().getTime());

  const [typing, setTyping] = useState(false);

  const [messeages, setMesseages] = useState<any[]>([]);
  const [all, setAll] = useState(false);

  const FetchMesseages = (first = false) => {
    if (!first && (all || lastScroll > new Date().getTime() - 500)) return;

    let searchParams = new URLSearchParams({ user_id: `${ctx.userId}`, clientAddress: `${ctx.socketAddress}`, with_id: `${talker}` });
    !first && searchParams.append("from_messeage", `${messeages[messeages.length - 1].id - 1}`);

    fetch(`${restUrl}/messeages?${searchParams.toString()}`).then(response => response.json())
      .then(result => {
        setAll(result.all);
        setMesseages([...messeages, ...result.messeages,]);
        setLastScroll(new Date().getTime());
        first && setTimeout(() => {// @ts-ignore
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }, 0);
      });
  }

  const notReaden = messeages.filter(e => !e.readen && ctx.userId === e.to_user);
  if (notReaden.length > 0) {
    sendSocket('read', { user_id: ctx.userId, messeage_id: notReaden[notReaden.length - 1].id });
    setMesseages(messeages.map(e => {
      return { ...e, readen: e.readen ? e.readen : " " };
    }));
  }

  useEffect(() => {
    talker !== -1 && FetchMesseages(true);
  }, [talker, ctx.userId]);

  addSocketEvent('typing', (e: any) => {
    if (Number(e.typer) !== talker) return;
    setTyping(e.typing);//@ts-ignore
    if (scrollRef.current.scrollTop + scrollRef.current.clientHeight >= scrollRef.current.scrollHeight)//@ts-ignore
      setTimeout(() => { scrollRef.current.scrollTop = scrollRef.current.scrollHeight * 2; }, 0);
  });
  addSocketEvent('messeage', (e: any) => {
    if (e.from_user !== talker && e.to_user !== talker)
      return notificate("New messeage", e.content, () => {
        setTalker(e.from_user);
      });

    setMesseages([e, ...messeages]);
  });
  addSocketEvent('notified', ({ messeage_id }: any) => {
    if (messeages.find(e => e.id === messeage_id))
      setMesseages(messeages.map(e => {
        return { ...e, notified: 1 };
      }));
  });
  addSocketEvent('read', ({ messeage_id, date }: any) => {
    if (messeages.find(e => e.id === messeage_id))
      setMesseages(messeages.map(e => {
        return { ...e, readen: e.readen ? e.readen : date };
      }));
  });

  const messeagesReduced = messeages.reduce((acc, e) => {
    const new_date = e.init_date.split(' ')[0];
    let elements = [
      ...acc.elements,
      acc.lastDate !== new_date && acc.lastDate !== "" && (
        <div className={style['date_splitter']} key={`.${acc.elements.length} `}>
          {acc.lastDate}
        </div>),
      <Messeage key={e.id} {...e} />
    ];
    return { elements: elements, lastDate: new_date };
  }, { elements: [], lastDate: " " });

  return (<section className={style['section']}>
    <span className={style['talkerName']}>You are talking to {talkerName}</span>
    <article ref={scrollRef} onScroll={() => {
      setTimeout(() => {
        if (scrollRef.current?.scrollTop !== undefined && scrollRef.current?.scrollTop < 700)
          FetchMesseages();
      }, 0);
    }}>
      <ul>
        {typing && <li className={`${messeageStyle['talker']} ${messeageStyle['messeage']}`}>
          <img src="/img/typing.svg" style={{ height: "1rem" }} alt="typing" />
        </li>}
        {messeagesReduced.elements}
        <div className={style['date_splitter']}>{messeagesReduced.lastDate}</div>
        {!all && <img className={style['messeageWait']} src="/img/typing.svg" alt="loading messeages" />}
      </ul>
    </article>
    <SendMesseage talker={talker} />
  </section >);
}

export { Messeages };
export default Messeages;