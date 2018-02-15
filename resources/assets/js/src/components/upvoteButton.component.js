import React,{Component} from 'react';
import {Button,Icon} from 'antd';

export class UpButton extends Component{
    render(){
        return(
            
        <div onClick={this.props.handleFunction} style={{height:60, width: 70,display:'flex',alignItems:'center',justifyContent:'center',color:'green'}} className="button">
             <Icon type="like-o" style={{fontSize:30}} />
        </div>        
        );
    }

    
}