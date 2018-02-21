import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';
  import ReactDOM from 'react-dom';
  import {Provider} from 'react-redux';
  import { PersistGate } from 'redux-persist/integration/react';
  import  {configureStore} from './src/store';
  import {AppScreen} from './src/app';
  import '../sass/app.scss';
  import 'antd/dist/antd.min.css';
  import {LoginScreen,RegisterScreen,AskQuestionScreen, AnswerQuestionScreen} from './src/screens';
  require('./bootstrap');


const {store,persistor} = configureStore();


class SOEN341 extends Component{
      render(){
          return(
           <Provider store={store}>
              <PersistGate persistor={persistor}>
              <Router>
                <Switch>
                  <Route exact path="/" component={AppScreen}/>
                  <Route path="/Login" component={LoginScreen}/>
                  <Route path="/Register" component={RegisterScreen}/>
                  <Route path="/question/ask" component={AskQuestionScreen}/>
                  <Route path="/question/answer" component={AnswerQuestionScreen}/>
                </Switch>
              </Router> 
              </PersistGate>
            </Provider>
          );
      }
  }

  ReactDOM.render(<SOEN341 />, document.getElementById('root'));