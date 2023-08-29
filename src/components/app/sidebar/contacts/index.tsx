import React, { useEffect, useState } from "react";
import style from "../sidebar.module.scss";
import { AuthContext, restUrl } from "src/utils";

function Contacts({ talker, setTalker, setTalkerName }: any) {
  const ctx = React.useContext(AuthContext);
  const [filter, setFilter] = useState<string>('');
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${restUrl}/contacts?${(
      new URLSearchParams({
        "user_id": `${ctx.userId}`,
        "clientAddress": `${ctx.socketAddress}`
      })).toString()}`)

      .then(response => response.json())
      .then(result => setContacts(result));
  }, [ctx.userId, ctx.socketAddress, setContacts]);

  const filteredContacts = contacts.filter(e => e.username?.includes(filter));

  return (<div className={style['contacts']}>
    <label className={style['label']}>
      <img src="/img/search.svg" alt="search" />
      <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search" />
    </label>
    {filteredContacts.length === 0 ?
      (<p className={style['noUsers']}>No users found</p>) :
      (<ul>
        {filteredContacts.map((e) => (<li key={e.id}>
          <button onClick={() => setTalker(e.id) || setTalkerName(e.username) || localStorage.setItem('messeage', e.id)} className={`${e.id === talker ? style['highlight'] : ''}`}>
            <img src={e.avatar} alt={`user avatar`} />
            <p>{!e.readen && e.from_user === talker && <span>!</span>}{e.username}</p>
          </button></li>))}
      </ul>)}
  </div>);
}

export { Contacts };
export default Contacts;