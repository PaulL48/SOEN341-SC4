import React,{Component} from 'react'

export class Button2 extends Component{
    render(){
        return(
        <div onClick={this.props.handleFunction} style={{height:60, width: 70, backgroundColor:'red', color:'white'}} className="button2">
            <span>VOTE DOWN</span>
        </div>        
        )
    }

    
}