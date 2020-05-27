import React from 'react';
import 'semantic-ui-css/semantic.min.css'; // Import only once at Root Component
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Home from './pages/Home/Home';
import GetEmployee from './pages/GetEmployee/GetEmployee';
import CreateEmployee from './pages/CreateEmployee/CreateEmployee';
import UpdateEmployee from './pages/UpdateEmployee/UpdateEmployee';

function App() {
  return (
    <Router>
      <div>
        <Menu pointing secondary inverted color="blue">
          <Menu.Item>
            <Link to="/">Home</Link>
          </Menu.Item>
        </Menu>

        <Switch>
          <Route path="/employee/create">
            <CreateEmployee />
          </Route>
          <Route path="/employee/:id/update">
            <UpdateEmployee />
          </Route>
          <Route path="/employee/:id">
            <GetEmployee />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
