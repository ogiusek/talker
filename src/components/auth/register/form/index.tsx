import React, { useState } from "react";
import style from "./style.module.scss";

import { Form } from "../../components";
import { Redirect, Route, Switch, redirect } from "stupid-react-router";
import { InputRoute } from "./input";
import { emailIsValid, usernameIsValid, passwordIsValid } from "../../codes";
import { restUrl } from "src/utils";

function RegisterForm() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [resultText, setResultText] = useState('');

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmPassword) {
      const searchParams = new URLSearchParams();
      searchParams.append("hash", password);
      searchParams.append("email", email);
      searchParams.append("username", username);
      redirect('/auth/register/load');
      fetch(`${restUrl}/register?${searchParams.toString()}`)
        .then(response => response.json())
        .then(result => { setResultText(result.res); });
    }
  };

  return (<Form onSubmit={onSubmit}>
    <Switch>
      <Route path="/email">
        <InputRoute setInput={setEmail} getError={emailIsValid} placeholder="Email"
          nextPath={"/auth/register/username"} key={"email"} />
      </Route>
      <Route path="/username">
        <InputRoute setInput={setUsername} getError={usernameIsValid} placeholder="Username"
          nextPath={"/auth/register/password"} prevPath={"/auth/register/email"} key={"username"} />
      </Route>
      <Route path="/password">
        <InputRoute setInput={setPassword} getError={passwordIsValid} placeholder="Password" type="password"
          nextPath={"/auth/register/confirmPassword"} prevPath={"/auth/register/username"} key={"password"} />
      </Route>
      <Route path="/confirmPassword">
        <InputRoute setInput={setConfirmPassword} getError={(cPassword, sError) => {
          if (cPassword !== password) { sError("Password's are not identical"); setFormIsValid(false); }
          else { sError(""); setFormIsValid(true); };
        }} placeholder="Confirm password" type="password"
          prevPath={"/auth/register/password"} key={"confirm"} />
        <button type="submit" disabled={!formIsValid} className={style['button']}>Register</button>
      </Route>
      <Route path="/load">
        {resultText ?
          (<h2 className={style['result']}>{resultText}</h2>) :
          (<img className={style['loadingImage']} src="/img/typing.svg" alt="Loading" />)}
      </Route>

      <Route path="/confirm/:userId/:uuid" values={[':userId', ':uuid']} setValues={(paths: any) => {
        const params = new URLSearchParams();
        params.append('id', paths[0]);
        params.append('uuid', paths[1]);
        fetch(`${restUrl}/register/confirm?${params.toString()}`)
          .then(response => response.json()).then(result => {
            setResultText(result.res);
          });
      }}>
        {resultText ?
          (<h2 className={style['result']}>{resultText}</h2>) :
          (<img className={style['loadingImage']} src="/img/typing.svg" alt="Loading" />)}
      </Route>

      <Route path="/"><Redirect to="/auth/register/email" /></Route>
    </Switch>
  </Form>);
}

export { RegisterForm };
export default RegisterForm;