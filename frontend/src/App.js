import { Switch, Route } from "react-router";
import { AdminPage, LoginPage, HomePage, Error404Page } from "./pages";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Auth Workshop</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Login</li>
            <li>Admin</li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/" component={Error404Page} />
      </Switch>
    </div>
  );
}

export default App;
