import './App.css';
import NavBar from './components/NavBar';
import { Switch, Route} from 'react-router-dom' 
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
