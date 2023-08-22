import React, { useState } from "react";
import style from "./style.module.scss";

import { Link, Redirect, Route, Switch } from "stupid-react-router";
import { restUrl } from "src/utils";
import { Header, Main, Section } from "../components";

function RegisterConfirm() {
  const [response, setResponse] = useState('');
  return (<Switch>
    <Route path="/:id/:uuid" values={[':id', ':uuid']} setValues={(paths) => { // @ts-ignore
      fetch(`${restUrl}/register/confirm?${(new URLSearchParams({ id: paths[0], uuid: paths[1] })).toString()}`).then(resp => resp.json())
        .then(({ res }: any) => {
          setResponse(res);
        })
    }}>
      <Main>
        <Header />
        <Section className={style['section']}>
          <article>
            <h1>Confirm register</h1>
            <p>{response}</p>
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
      </Main>
    </Route>
    <Route path="/"><Redirect to="/auth" /></Route>
  </Switch>);
}

export { RegisterConfirm };