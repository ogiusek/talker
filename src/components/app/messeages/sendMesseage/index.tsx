import React, { useState } from "react"; // @ts-ignore
import style from "./style.module.scss"; // @ts-ignore

import { AuthContext, sendSocket } from "src/utils";

interface Props {
  talker: Number,
}

function SendMesseage({ talker }: Props) {
  const [messeage, setMesseage] = useState<string>('');
  const ctx = React.useContext(AuthContext);


  return (<form className={style['form']} onSubmit={(e) => {
    e.preventDefault();
    if (messeage === '') return;
    sendSocket('messeage', { // @ts-ignore
      user_id: ctx.userId,
      to_id: talker,
      content: messeage,
      content_type: 'text'
    });
    setMesseage('');
  }}>
    <label className={style['input']}>
      <input value={messeage} onChange={e => {
        talker !== -1 && setMesseage(e.target.value);
        sendSocket("type", { "user_id": `${ctx.userId}`, "to_id": `${talker}` });
      }} type="text" placeholder={talker === -1 ? 'Select talker' : 'Messeage'} />
      <button type="submit" ><img src="img/send.svg" alt="send" /></button>
    </label>
  </form>);
}

export { SendMesseage };