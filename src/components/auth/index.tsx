import React from "react";
import { Route, Switch, Redirect } from "stupid-react-router";

import Login from "./login";
import Register from "./register";
import Information from "./information";
import { RegisterConfirm } from "./registerConfirm";

function Auth() {
  return (<Switch>
    <Route path="/auth/login"><Login /></Route>
    <Route path="/auth/register/confirm"><RegisterConfirm /></Route>
    <Route path="/auth/register"><Register /></Route>
    <Route path="/auth"><Information /></Route>

    <Route path="/"><Redirect to="/auth" /></Route>
  </Switch>);
}

export { Auth };
export default Auth;