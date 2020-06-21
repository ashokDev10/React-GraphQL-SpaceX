import React from "react";
import "./App.css";
import Logo from "./SpaceX.jpg";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Launches from "./components/Launches";
import { Route, BrowserRouter } from "react-router-dom";
import Launch from "./components/Launch";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="container">
          <img
            src={Logo}
            alt=""
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
