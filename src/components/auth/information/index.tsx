import React from "react";
import style from "./style.module.scss";

function Information() {
  return (<main className={style['main']}>
    <header className={style['header']}>
      {/* talker logo */}
      {/* login register dropdown */}
      <hr />
    </header>
    <section className={style['section']}>
      {/* why talker in <article>'s */}
    </section>
    <footer className={style['footer']}>
      {/* contact */}
    </footer>
  </main>);
}

export { Information };
export default Information;