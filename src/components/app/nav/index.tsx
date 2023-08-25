import React from "react";
import style from "./style.module.scss";

import { AuthContext, sendSocket, toggleNightMode } from "src/utils";

interface Props {
  sidebar: 'contacts' | 'search',
  setSidebar: React.Dispatch<React.SetStateAction<'contacts' | 'search'>>
  showSidebar: boolean,
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
}

function Nav({ sidebar, setSidebar, showSidebar, setShowSidebar }: Props) {
  const ctx: any = React.useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    localStorage.removeItem('messeage');
    ctx.setUserId(-1);
    sendSocket("logout", "");
  }

  const nightmode = () => {
    toggleNightMode();
    ctx.refresh();
  }

  const toggleSidebar = (val: 'contacts' | 'search') => {
    val !== sidebar ?
      setShowSidebar(true) :
      setShowSidebar(!showSidebar);

    setSidebar(val);
  }

  const contacts = () => {
    const val = 'contacts';
    toggleSidebar(val);
  }

  const search = () => {
    const val = 'search'
    toggleSidebar(val);
  }

  return (<nav className={style['nav']}>
    {/* settings */}
    <button onClick={logout}>
      <img src="/img/logout.svg" alt="logout" /></button>

    <button onClick={nightmode}>
      <img src={`/img/${localStorage.getItem('nightmode') === '1' ? 'sun.svg' : 'moon.svg'}`} alt="nightmode" /></button>

    <button onClick={contacts}>
      <img src="/img/contacts.svg" alt="contacts" /></button>

    <button onClick={search}>
      <img src="/img/search.svg" alt="search" /></button>
  </nav>);
}

export { Nav };
export default Nav;