import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getVoteCount} from '../api';
import {Voting} from './';

export class ListC extends Component {

    constructor() {
        super();
    }

    handleData(id){ 
        return getVoteCount(id);
    }

    render() {
        return(
           <div className="QTable"  >{this.props.data.map((currentItem,index)=>{
                return(
                    <div key ={index}>
                    <div className="QRow" key={index} >
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
                            <Voting id={currentItem.id} handleRequest={()=>this.handleData(currentItem.id)}/>
                             <Link  to={{ 
                                pathname: '/question/answer', 
                                state: {title: currentItem.title ,id:currentItem.id,question: currentItem.question,author: currentItem.author,time:currentItem.created_at } 
                            }} className="QTitle" style={{textAlign:'left'}}>{currentItem.title}</Link>
                        </div></div>
                        <div className="QAuthor">Asked by {currentItem.author} at {currentItem.created_at}</div>        
                    
                    </div>
                );
           })}
           </div>
        );
    }

}