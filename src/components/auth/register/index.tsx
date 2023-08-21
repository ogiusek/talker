import React from "react";
import style from "./style.module.scss";

import { Main, Header, Section } from "../components";
import { RegisterForm } from "./form";
import { Link } from "stupid-react-router";

function Register() {
  return (<Main>
    <Header />
    <Section className={style['section']}>
      <article>
        <RegisterForm />
      </article>
      <footer>
        <Link to="/auth/login/login">Have an account ? <br />Login</Link>
      </footer>
    </Section>
  </Main>);
}

export { Register };
export default Register;