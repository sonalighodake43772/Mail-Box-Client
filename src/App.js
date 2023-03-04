import { Fragment } from "react";
import { Route } from "react-router-dom";
import DummyScreen from "./components/pages/DummyScreen";
import SignUp from "./components/SignUp";
import SendMail from "./components/pages/SendMail";
import Header from "./components/pages/Header";
import MailInbox from "./components/pages/MailInbox";



function App() {
  return (
    <Fragment >

<Header />
      <br />
   <Route path="/" exact>
        <SignUp />
      </Route>   
        <Route path="/DummyScreen" exact>
        <DummyScreen />
      </Route>
      <Route path="/SendMail" exact>
        <SendMail />
      </Route>
      <Route path="/MailInbox" exact>
        <MailInbox />
      </Route>
     
    </Fragment>
  );
}

export default App;
