import React, { Component } from 'react';
import {UpButton,Button2} from './';
import Axios from 'axios';



export class Voting extends Component {
  constructor(){
    super();
    this.state={
      count:0, downCount:0
    };
    
  }

  componentDidMount(){
    Axios.request({
      url:'/vote/question',
      method:'post',
      data:{
          
      }
  }).then((res)=>{
      console.log(res);
  }).catch((err)=>{
      console.log(err);
  });
  }
  
  handleCount(){
    this.setState({
      count:this.state.count+1
    });
  }
  handleCount2(){
    this.setState({
      downCount:this.state.downCount+1
    });
  }
  render() {
    return (
      <div className="App">
         
          <div style={{display:'flex',flexDirection:'row'}}>
            <UpButton handleFunction={()=>this.handleCount()}/> 
              <span style={{fontSize:40}}> 
                {this.state.count} 
              </span>
          </div> 

          <div style={{display:'flex',flexDirection:'row'}}>
             <Button2 handleFunction={()=>this.handleCount2()}/>
              <span style={{fontSize:40}}> 
                {this.state.downCount} 
              </span>
          </div>
         
      </div>
    );
  }
}


