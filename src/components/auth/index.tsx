import React from "react";
import { Route, Switch, redirect } from "stupid-react-router";

import Login from "./login";
import Register from "./register";
import Information from "./information";

function Auth() {
  return (<Switch>
    <Route path="/auth/login"><Login /></Route>
    <Route path="/auth/register"><Register /></Route>
    <Route path="/auth"><Information /></Route>

    <Route path="/">{redirect('/auth')}</Route>
  </Switch>);
}

export { Auth };
export default Auth;