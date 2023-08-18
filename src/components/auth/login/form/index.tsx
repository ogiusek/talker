import React, { useEffect, useState } from "react";
import style from "./style.module.scss";

import { Form } from "../../components";

import { Redirect, Route, redirect } from "stupid-react-router";
import { InputRoute } from "../../register/form/input";
import { loginIsValid, passwordIsValid } from "../../codes";
import { AuthContext, addSocketEvent, sendSocket } from "../../../../utils";

function LoginForm() {
  const ctx = React.useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState<string>('Error');

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    passwordIsValid(password, setFormIsValid);
  }, [password]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    redirect('/auth/login/send');

    addSocketEvent('login', data => {
      if (data === false) {
        alert('Wrong password!');
        localStorage.removeItem('login');
        localStorage.removeItem('password');
        redirect('/auth/login/password');
      } else
        ctx.setUserId(data.id);
    });

    localStorage.setItem('login', login);
    localStorage.setItem('password', password);
    sendSocket("login", {
      "login": login,
      "hash": password
    });
  };

  return (<Form onSubmit={onSubmit}>
    <Route path="/login">
      <InputRoute setInput={setLogin} getError={loginIsValid} placeholder="Login"
        nextPath={"/auth/login/password"} key={"login"} />
    </Route>
    <Route path="/password">
      <InputRoute setInput={setPassword} getError={passwordIsValid} placeholder="Password" type="password"
        prevPath={"/auth/login/login"} key={"password"} />
      <button type="submit" disabled={!!formIsValid} className={style['button']}>Login</button>
    </Route>
    <Route path="/send">
      <img className={style['loadingImage']} src="/img/typing.svg" alt="Loading" />
    </Route>

    <Route path="/">
      <Redirect to="/auth/login/login" />
    </Route>


    {/* <Input placeholder="Email or login" setInput={setLogin} errorText={loginError} /> */}

    {/* <Input placeholder="Password" type="password" setInput={setPassword} errorText={passwordError} /> */}

    {/* <div onMouseEnter={() => {
      const activeElement = document.activeElement as HTMLElement;
      if (!loginError || !passwordError)
        activeElement?.blur();
    }}>
    </div> */}
    {/* <BlurOnHover>
      <button className={style['button']} type="submit" disabled={!formIsValid}>Login</button>
    </BlurOnHover> */}
  </Form>);
}

export { LoginForm };
export default LoginForm;