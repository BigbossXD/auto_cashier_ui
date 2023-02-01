import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Main from "./pages/v1/Main";
import Home from "./pages/Home";
function App() {
  return (
    <div className="container-fluid" style={{ padding: 20 }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/v1" exact component={Main} />
          {/* <Redirect from="*" to="/home" /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
