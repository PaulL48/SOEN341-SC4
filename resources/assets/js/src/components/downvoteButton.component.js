import React,{Component} from 'react';
import {Button,Icon} from 'antd';

export class Button2 extends Component{
    render(){
        return(
        <div onClick={this.props.handleFunction} style={{height:60, width: 70, display:'flex',alignItems:'center',justifyContent:'center',color:'red'}} className="button2">
            <Icon type="dislike-o"style={{fontSize:30}} />
        </div>        
        );
    }

    
}