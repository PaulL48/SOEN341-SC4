import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';
  import ReactDOM from 'react-dom';
  import App from './src/app';
  import {Test} from './src/screens';
  import '../sass/app.scss';
  import 'antd/dist/antd.min.css';
  require('./bootstrap');

  
class SOEN341 extends Component{
      render(){
          return(
            <Router>
              <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/test" component={Test}/>
              </Switch>
            </Router> 
          );
      }
  }

  ReactDOM.render(<SOEN341 />, document.getElementById('root'));