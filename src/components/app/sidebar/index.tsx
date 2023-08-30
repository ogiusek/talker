import React from "react";
import style from "./style.module.scss";

import { Contacts } from "./contacts";
import { Search } from "./search";

interface Props {
  sidebar: 'contacts' | 'search',
  showSidebar: boolean,
  talker: Number,
  setTalker: React.Dispatch<React.SetStateAction<Number>>,
  setTalkerName: React.Dispatch<React.SetStateAction<string>>,
}

function Sidebar({ sidebar, showSidebar, talker, setTalker, setTalkerName }: Props) {
  return (<div className={`${style['sidebar']} ${showSidebar ? style['show'] : style['hide']}`}>
    {(sidebar === 'contacts' ?
      <Contacts talker={talker} setTalker={setTalker} setTalkerName={setTalkerName} /> :
      <Search talker={talker} setTalker={setTalker} setTalkerName={setTalkerName} />)}
  </div>);
}

export { Sidebar };
export default Sidebar;