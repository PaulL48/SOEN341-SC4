import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Quill from 'react-quill';
import {Button} from 'antd';
import Axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import 'antd/dist/antd.css';
import './AskQuestion.scss';



class AskQuestion extends Component {
    constructor(){
        super();
        this.state = {
            title:'',
            question: '',
            resolved:false
        };
        
    }

    handleInputText(e,delta,source,content){
        this.setState({
            question: content.getText()
        });
        console.log(this.state.question);
    }

    handleSubmit(){
        Axios.request({
            url:'/ask',
            method:'post',
            data:{
                title: this.state.title,
                question: this.state.question,
                resolved: this.state.resolved
            }
        }).then((res)=>{
            console.log(res);
            window.location.href = "http://pmlabs.cagg";
        }).catch((err)=>{
            console.log(err);
        });
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
            <div className="AskQuestion-wrapper">
            <div className="inner-wrapper">
                <span style={{fontWeight:'bold',fontSize:20,color:'black',alignSelf:'center'}}>Ask a question</span>
                <div className="title-wrapper">
                    <span style={{fontWeight:'bold',color:'black'}}>Title</span>
                    <div className="title-input">
                        <input style={{paddingLeft:10}} placeholder="Your title here..." onChange={(e)=>this.setState({title:e.target.value})}/>
                    </div>
                </div>
                <Quill
                theme="snow"
                modules={this.modules}
                formats={this.formats}
                className="Quill"
                onChange={(e,delta,source,content)=>this.handleInputText(e,delta,source,content)}
                placeholder="Your question here..."
                />
                <Button className="submitQuestion" type="primary" onClick={()=>this.handleSubmit()}>Post your question</Button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<AskQuestion />, document.getElementById('AskQuestionComponent'));




