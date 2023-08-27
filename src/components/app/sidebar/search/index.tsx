import React, { useEffect, useState } from "react";
import style from "../sidebar.module.scss";
import { AuthContext, restUrl } from "src/utils";

function Search({ talker, setTalker, setTalkerName }: any) {
  const ctx = React.useContext(AuthContext);
  const [filter, setFilter] = useState<string>('');
  const [found, setFound] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${restUrl}/search/users?${(
      new URLSearchParams({ "user_name": `${filter}` })).toString()}`)
      .then(response => response.json())
      .then(result => setFound(result.filter((e: any) => e.id !== ctx.userId)));
  }, [filter, setFound, ctx.userId]);

  return (<div className={style['contacts']}>
    <label className={style['label']}>
      <img src="/img/search.svg" alt="search" />
      <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search" />
    </label>
    {found.length === 0 ?
      (<p className={style['noUsers']}>No users found</p>) :
      (<ul>
        {found.map((e) => (<li key={e.id}>
          <button onClick={() => setTalker(e.id) || setTalkerName(e.username) || localStorage.setItem('messeage', e.id)} className={`${e.id === talker ? style['highlight'] : ''}`}>
            <img src={e.avatar} alt={`user avatar`} />
            <p>{e.username}</p>
          </button></li>))}
      </ul>)}
  </div>);
}

export { Search };
export default Search;