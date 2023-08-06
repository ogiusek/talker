import React from "react";
import style from "./style.module.scss";

interface IMainProps {
  children?: any,
  className?: string
}

function Main({ children, className = '' }: IMainProps) {
  return (<main className={`${style['main']} ${className}`}>
    {children}
  </main>);
}

export { Main };
export default Main;