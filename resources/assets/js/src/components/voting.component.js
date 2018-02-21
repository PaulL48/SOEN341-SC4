import React, { Component } from 'react';
import {UpButton,Button2} from './';
import Axios from 'axios';


const upvote = "upVote";
const downvote = "downVote";

export class Voting extends Component {
  constructor(){
    super();
    this.state={
      count:0,
    };
    
  }

  componentDidMount(){
    

  //   Axios.request({
  //     url:'/vote/question/count',
  //     data:{
  //         id: this.props.id,
  //     }
  // }).then((res)=>{
  //     console.log(res);
  // }).catch((err)=>{
  //     console.log(err);
  // });
  }
  
  handleVote(id,vote){
    Axios.request({
      url:'/vote/question',
      method:'post',
      data:{
          id: id,
          vote: vote
      }
  }).then((res)=>{
      console.log(res);
  }).catch((err)=>{
      console.log(err);
  });
  }
  render() {
    const {id} = this.props;
    return (
      <div className="App" style={{display:'flex',flexDirection:'row' , justifyContent:'center',alignItems:'center'}}>
          <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{display:'flex',flexDirection:'row'}}>
              <UpButton handleFunction={()=>this.handleVote(id,upvote)}/> 
            </div> 
            <div style={{display:'flex',flexDirection:'row'}}>
              <Button2 handleFunction={()=>this.handleVote(id,downvote)}/>
            </div>
          </div>
          <span style={{fontSize:40}}> 
                {this.state.count} 
          </span>
      </div>
    );
  }
}


