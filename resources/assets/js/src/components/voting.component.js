import React, { Component } from 'react';
import {UpButton,Button2} from './';
import {getVoteCount,updateVoteCount} from '../api';
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
    setTimeout(()=>{ // fake asyncronous method since we need to wait for the props to be fully updated with the id's
      this.props.handleRequest().then((res)=>{
        this.setState({count: res.data.count});
      }).catch((err)=>{
        console.log(err);
      });
    },500);
  }
  
  handleVote(id,vote){
    updateVoteCount(id,vote).then(()=>{
      getVoteCount(this.props.id).then((res)=>{
          this.setState({count: res.data.count});
      }).catch((err)=>{
          console.log(err);
      });
  }).catch((err)=>{
      console.log(err);
  });
  }
  render() {
    const {id} = this.props;
    return (
      <div className="App" style={{width:120,display:'flex',flexDirection:'row' , justifyContent:'left',alignItems:'center'}}>
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


