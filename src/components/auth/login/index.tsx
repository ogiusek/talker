import React from "react";
import style from "./style.module.scss";
import { Link } from "stupid-react-router";

import { LoginForm } from "./form";
import { Main, Header, Section } from "../components";

function Login() {
  return (<Main>
    <Header />
    <Section className={style['section']}>
      <article>
        <LoginForm />
      </article>
      <footer>
        <Link to="/auth/register/email">Don't have an account ? <br />Register</Link>
      </footer>
    </Section>
  </Main>);
}

export { Login };
export default Login;