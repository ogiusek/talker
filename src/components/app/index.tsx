import React, { useState } from "react";
import style from "./style.module.scss";

import { Redirect, Route, Switch } from "stupid-react-router";
import { Messeages } from "./messeages";
import { Sidebar } from "./sidebar";

import Nav from "./nav";

function App() {
  const [talkerName, setTalkerName] = useState('');
  const [talker, setTalker] = useState<Number>(isNaN(Number(localStorage.getItem('messeage'))) ? -1 : Number(localStorage.getItem('messeage')));
  const [sidebar, setSidebar] = useState<'contacts' | 'search'>('contacts');
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (<Switch>
    <Route exact path="/messeages" >
      <main className={style['main']}>
        <Nav
          sidebar={sidebar} setSidebar={setSidebar}
          showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <Sidebar
          showSidebar={showSidebar} talker={talker}
          sidebar={sidebar} setTalker={setTalker} setTalkerName={setTalkerName} />

        <Messeages talkerName={talkerName} talker={talker} setTalker={setTalker} key={Number(talker)} />
      </main>
    </Route>
    <Route path="/"><Redirect to="/messeages" /></Route>
  </Switch>);
}

export { App };
export default App;