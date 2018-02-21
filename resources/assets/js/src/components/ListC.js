import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Voting} from './';

export class ListC extends Component {

    constructor() {
        super();
    }

    list() {
     
    }

    render() {
        return(
           <div className="QTable"  >{this.props.data.map((currentItem,index)=>{
                return(
                    <div className="QRow" key={index} >
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:500}}>
                            <Voting id={currentItem.id}/>
                             <Link  to={{ 
                                pathname: '/question/answer', 
                                state: { question: currentItem.question } 
                            }} className="QTitle" style={{textAlign:'right',width:300}}>{currentItem.title}</Link>
                        </div>
                        <span className="QAuthor">Created by {currentItem.author} at {currentItem.created_at}</span>        
                    </div>
                );
           })}
           </div>
        );
    }

}