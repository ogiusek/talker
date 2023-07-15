import React from "react";
import { Route, Switch, redirect } from "stupid-react-router";

function Auth() {
  return (<Switch>
    <Route path="/auth/login"></Route>
    <Route path="/auth/register"></Route>
    <Route path="/auth"></Route>

    <Route path="/">{redirect('/auth')}</Route>
  </Switch>);
}

export { Auth };
export default Auth;