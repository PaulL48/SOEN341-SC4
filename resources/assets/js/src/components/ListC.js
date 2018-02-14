import React, { Component } from 'react';


const test=[
    {
        title: 'Life',
        author: 'Jake',
        created_at: '12-08-2030',
        resolved: false  
    },
    {
        title: 'Life',
        author: 'Jake',
        created_at: '12-08-2030',
        resolved: false  
    },
    {
        title: 'Life',
        author: 'Jake',
        created_at: '12-08-2030',
        resolved: false  
    },
    {
        title: 'Life',
        author: 'Jake',
        created_at: '12-08-2030',
        resolved: false  
    },
    {
        title: 'Life',
        author: 'Jake',
        created_at: '12-08-2030',
        resolved: false  
    },
    {
        title: 'Life',
        author: 'Jake',
        created_at: '12-08-2030',
        resolved: false  
    },
    {
        title: 'Life',
        author: 'Jake',
        created_at: '12-08-2030',
        resolved: false  
    },
];


export class ListC extends Component {

    constructor() {
        super();
    }

    list() {
     
    }

    render() {
        return(
           <div className="QTable"  >{test.map((currentItem,index)=>{
                return(
                    <div className="QRow" key={index}>
                        <span className="QTitle">{currentItem.title}</span>
                        <span className="QResolved">{currentItem.resolved}</span>
                        <span className="QAuthor">Created by {currentItem.author} at {currentItem.created_at}</span>        
                    </div>
                );
           })}
           </div>
        );
    }

}