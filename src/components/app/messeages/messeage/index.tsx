import React from "react";
import style from "./style.module.scss";

import { AuthContext } from "src/utils";
import { MesseageDate } from "./messeageDate";
import { Icon } from "./icon";

function Messeage({ content, content_type, from_user, id, init_date, notified, readen, /*to_user*/ }: any) {
  const ctx = React.useContext(AuthContext);

  return (<li key={id} className={`${style['messeage']} ${from_user === ctx.userId ?
    style['my'] : style['talker']}`}>

    {content_type === 'text' && <span className={style['text']}>{content}</span>}
    <MesseageDate date={init_date} />

    {from_user === ctx.userId &&
      <Icon readen={readen} notified={notified} />}
  </li>);
}

export { Messeage };