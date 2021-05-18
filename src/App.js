import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Login from "./components/Login";
import RegForm from "./components/RegForm";
import RegList from "./components/RegList";
import SideBar from "./components/Sidebar";

import ContextGlobal from "./context/ContextGlobal";

import "./App.css";
import "./styles/theme.css";
import "./styles/button.css";

function App() {
  const [theme, toggleTheme] = useState(false);
  const [LogInInfo, setLoginInfo] = useState(null);
  const [sideBar, toggleSideBar] = useState(false);
  const [activeLink, setStateActiveLink] = useState("login");

  const onThemeToggle = (e) => {
    e.preventDefault();
    toggleTheme((state) => !state);
  };

  const cancelHandler = () => {
    setLoginInfo(null);
  };

  const onToggleSideBar = () => {
    toggleSideBar((state) => {
      return !state;
    });
  };

  const setActiveLink = (link) => {
    setStateActiveLink(link);
  };

  if (theme) {
    document.body.classList.add("theme-light-grey");
    document.body.classList.remove("theme-dark-grey");
  } else {
    document.body.classList.add("theme-dark-grey");
    document.body.classList.remove("theme-light-grey");
  }
  return (
    <div className="App">
      <ContextGlobal.Provider
        value={{
          LogInInfo: LogInInfo,
          theme: theme,
          sideBar: sideBar,
          activeLink: activeLink,
          setActiveLink: setActiveLink,
          setLoginInfo: setLoginInfo,
          cancelHandler: cancelHandler,
          themeToggle: onThemeToggle,
          sideBarToggle: onToggleSideBar,
        }}
      >
        <Router basename={process.env.PUBLIC_URL}>
          <SideBar />
          <Header />

          <Switch>
            <Route path="/request-list">
              <RegList />
            </Route>
            <Route path="/request">
              <RegForm />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              {LogInInfo ? <Redirect to="/register" /> : <Redirect to="/login" />}
            </Route>
            <Route component={Login} />
          </Switch>
        </Router>
      </ContextGlobal.Provider>
    </div>
  );
}

export default App;
