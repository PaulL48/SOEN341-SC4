import React, { Component } from 'react';
import {Header} from '../components';

export class Test extends Component {
    constructor(){
        super();
        this.state={
            
        };
    }
    render() {
        return (
            <div>
                <Header/>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:window.innerHeight-50}}>
                   <span>This is an unauthenticated route, allow users to check questions without signin in</span>
            </div>
            </div>
        );
    }
}




