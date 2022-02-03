import { Switch, Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import {
  AdminPage,
  LoginPage,
  HomePage,
  Error404Page,
  Dashboard,
} from './pages';

const PrivateRoute = (props) => {
  const { id } = useSelector((state) => state.user);
  const isLoggedIn = !!id;

  if (isLoggedIn) {
    return <Route {...props} />;
  } else {
    toast.error('Could you please stop trying breaking things, sir ?');
    return <Redirect to='/' />;
  }
};

function App() {
  const { id } = useSelector((state) => state.user);
  const isLoggedIn = !!id;

  return (
    <div className='App'>
      <header>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to='/admin'>Admin</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <PrivateRoute path='/admin' component={AdminPage} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <Route path='/' component={Error404Page} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
