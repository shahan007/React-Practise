import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SeachParams from "./SearchParams";
import Details from "./details";

const App = () => {
  return (
    <div>
      <Router>
        <header>
          <Link to="/">
            <h1>Adopt Me</h1>
          </Link>
        </header>
        <Switch>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/">
            <SeachParams />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
