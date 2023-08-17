import React from "react";
import style from "../style.module.scss";

interface Props {
  date: string
}

function MesseageDate({ date }: Props) {
  return (<span className={style['initDate']}>{date.split(' ')[1]?.slice(0, -3)}</span>);
}

export { MesseageDate };