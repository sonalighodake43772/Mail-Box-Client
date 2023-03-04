import { Fragment } from "react";
import { Route } from "react-router-dom";
import DummyScreen from "./components/pages/DummyScreen";
import SignUp from "./components/SignUp";


function App() {
  return (
    <Fragment >
   <Route path="/" exact>
        <SignUp />
      </Route>   
        <Route path="/DummyScreen" exact>
        <DummyScreen />
      </Route>
    </Fragment>
  );
}

export default App;
