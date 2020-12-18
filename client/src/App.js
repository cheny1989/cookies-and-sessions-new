import React from 'react';
import './App.css';
// import Themes from "./components/Themes"
import ThemeSession from "./components/ThemeSession"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Cookies and Sessions</h1>
        <Router>
          <hl>
            <li><Link to="/app">Home</Link></li>
            <li><Link to="/themes">Themes</Link></li>
          </hl>
          <Route path="/app" render={()=><h1>Home Page</h1>} />
          <Route path="/themes" render={()=> <ThemeSession />} />
        </Router>
      </div>
    );
  }
}

export default App;
