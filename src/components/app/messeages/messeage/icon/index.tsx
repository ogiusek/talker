import React from "react";
import style from "./style.module.scss";

function Icon({ readen, notified }: any) {
  return (<div className={style['icon']}>

    {notified ?
      (readen ?
        <React.Fragment>
          <img alt={"readen"} src="/img/readen.svg" />
          <span>{readen.split(' ')[1].slice(0, -3)}</span>
        </React.Fragment>
        :
        <img alt={'notified'} src="/img/notified.svg" />
      )
      : <img alt={'not notified'} src="/img/not_notified.svg" />
    }
  </div>);
}

export { Icon };