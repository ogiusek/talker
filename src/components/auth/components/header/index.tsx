import React from "react";
import style from "./style.module.scss";

import { Link } from "stupid-react-router";
import { Logo } from "../../../components";

function Header() {
  return (
    <header className={style['header']}>
      <Link to="/auth" className={style['logo-container']}>
        <Logo text={true} />
      </Link>
    </header>);
}

export { Header };
export default Header;