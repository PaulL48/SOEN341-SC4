import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';
  import ReactDOM from 'react-dom';
  import App from './src/app';
  import {Login,Register} from './src/auth';
  import '../sass/app.scss';
  require('./bootstrap');

  
class SOEN341 extends Component{
      render(){
          return(
            <Router>
              <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
              </Switch>
            </Router> 
          );
      }
  }

  ReactDOM.render(<SOEN341 />, document.getElementById('root'));