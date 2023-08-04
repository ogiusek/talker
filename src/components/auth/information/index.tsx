import React from "react";
import style from "./style.module.scss";

import { Link } from "stupid-react-router";
import { Main, Header, Section } from "../components";

function Information() {
  return (<Main>
    <Header />
    <Section className={style['section']}>
      <article>
        <h1>What is a Talker ?</h1>
        <p>Talker is a straightforward and minimalistic communicator</p>
      </article>
      <article className={style['links']}>
        <Link to="/auth/login/login" className={style['link-login']}>
          Login
        </Link>
        <Link to="/auth/register/email" className={style['link-register']}>
          Register
        </Link>
      </article>
    </Section>
  </Main>);
}

export { Information };
export default Information;