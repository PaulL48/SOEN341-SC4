import React, { Component } from 'react';
import {Header} from '../../../components';
import {connect} from 'react-redux';
import Quill from 'react-quill';
import {Button} from 'antd';
import Axios from 'axios';


const mapStateToProps = state =>({
    isLoggedIn: state.auth.isLoggedIn,
    currentUser : state.auth.currentUser
});
const mapDispatchToProps = dispatch =>({
    
});


class AnswerQuestion extends Component {
    constructor(){
        super();
        this.state = {
            title:'',
            question: '',
            resolved:false
        };
        
    }
    componentDidMount(){
        console.log(this.props);
    }

    handleInputText(e,delta,source,content){
        this.setState({
            question: content.getText()
        });
        console.log(this.state.question);
    }

    handleSubmit(){
        
    }
   


    modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
      formats: [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
    

    
    render() {
        return (
            <div>
                <Header/>
                <div className="AskQuestion-wrapper">
                <div className="inner-wrapper">
                    <span style={{fontWeight:'bold',fontSize:20,color:'black',alignSelf:'center'}}>question</span>
                    <span style={{fontWeight:'bold',fontSize:30,color:'black',alignSelf:'center',margin:30}}>{this.props.history.location.state.question}</span>
                    <Quill
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    className="Quill"
                    onChange={(e,delta,source,content)=>this.handleInputText(e,delta,source,content)}
                    placeholder="Your answer here..."
                    />
                    <Button className="submitQuestion" type="primary" onClick={()=>this.handleSubmit()}>Post your answer</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export const AnswerQuestionScreen = connect(mapStateToProps,mapDispatchToProps)(AnswerQuestion);

