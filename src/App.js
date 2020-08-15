import React, { PureComponent } from "react";
import "./App.css";
import Home from "./pages/Home"
import { Provider } from "react-redux";
import store from "./store";

class App extends PureComponent {
  render(){
  return (
    <Provider store={store}>
      <Home />
      </Provider>
  )};
}

export default App;