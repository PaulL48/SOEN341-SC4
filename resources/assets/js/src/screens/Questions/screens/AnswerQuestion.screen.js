import React, { Component } from 'react';
import {Header,AnswerVoting} from '../../../components';
import {connect} from 'react-redux';
import Quill from 'react-quill';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {Button} from 'antd';
import './AnswerQuestion.scss';
import {answerQuestion,getAnswers,setAcceptedAnswer,unsetAcceptedAnswer, suggestQuestion, getSuggestion} from '../../../api';

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
            answer:'',
            currentAnswers: [],
            hasAcceptedAnswer: false,
            hasSuggestion: false,
            isAuthor: false,
            suggestion:'',
        };
        
    }
    componentWillMount(){
    }
    componentDidMount(){
        console.log(this.props);
        getAnswers(this.props.history.location.state.id).then((res)=>{
            this.setState({currentAnswers: res.data.data,hasAcceptedAnswer:res.data.hasAccepted});
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });
        this.handleSuggestionText();
    }

    handleInputText(e,delta,source,content){
        this.setState({
            answer: content.getText()
        });
    }

    handleSuggestionText(e,delta,soure,content){
        this.setState({
            suggestion: content.getText()
        });
    }

    handleSubmit(){
        if(!this.props.isLoggedIn){
            alert('You need to be signed in to answer!');
            window.location.href = "/Login"; // window.location.href will refresh the browser by default which is needed to refresh the csrf token in this case
        }else if(this.props.history.location.state.author === this.props.currentUser.user.name){
            alert('You can\'t answer your own question!');
        }else{
            answerQuestion(this.props.history.location.state.id,this.state.answer);
            setTimeout(()=>{ // fake asyncronous method
                getAnswers(this.props.history.location.state.id).then((res)=>{
                    this.setState({currentAnswers: res.data.data});
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                });
            },500);
        }
    }

    handleAcceptedAnswer(id){
        console.log(this.state);

        if(this.state.hasAcceptedAnswer === false){
            setAcceptedAnswer(id).then(()=>{
                setTimeout(()=>{ // fake asyncronous method
                    getAnswers(this.props.history.location.state.id).then((res)=>{
                        this.setState({currentAnswers: res.data.data,hasAcceptedAnswer:res.data.hasAccepted});
                        console.log(res);
                    }).catch((err)=>{
                        console.log(err);
                    });
                },500);
            });
        }else{
            alert('Only one accepted answer can be applied!');
        }
    }
    handleRejectAnswer(id){
            unsetAcceptedAnswer(id).then(()=>{
                setTimeout(()=>{ // fake asyncronous method
                    getAnswers(this.props.history.location.state.id).then((res)=>{
                        this.setState({currentAnswers: res.data.data,hasAcceptedAnswer:res.data.hasAccepted});
                        console.log(res);
                    }).catch((err)=>{
                        console.log(err);
                    });
                },500);
            });
    }

    handleAcceptedLogo(currentItem){
        if(this.props.isLoggedIn && this.props.history.location.state.author === this.props.currentUser.user.name){
            if(currentItem.accepted.toString() === "0"){
                return(
                    <div onClick={()=>this.handleAcceptedAnswer(currentItem.id)}>
                        <FontAwesomeIcon className="fa-check-circle" icon="check-circle" style={{alignSelf:'flex-start'}}/>
                    </div>
                );
            }else{
            
                return(
                    <div style={{display:'flex',flexDirection:'row'}}>
                    <span>Accepted</span>
                        <div onClick={()=>this.handleRejectAnswer(currentItem.id)}>
                        <FontAwesomeIcon className="fa-times-circle" icon="times-circle" size="lg" />
                        </div>
                    </div>
                );
            }
        }else{
            if(currentItem.accepted.toString() === "1"){
                return(
                    <div style={{display:'flex',flexDirection:'row'}}>
                    <span>Accepted</span>
                    </div>
                );
             }
          }
    }

    handleDisplayAnswers(){
        if(this.state.currentAnswers.length !== 0){
        return this.state.currentAnswers.map((currentItem,index)=>{
            return(
                <div key={index} style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <AnswerVoting id={currentItem.id} handleRequest={()=>this.handleData(currentItem.id)}/>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <span className="AnswerText" style={{fontSize:30,margin:30}}>Answer #{index+1}</span>
                        <span className="AnswerText">{currentItem.answer}</span>
                    </div>
                    {this.handleAcceptedLogo(currentItem)}
                </div>
                );
            }
        );
    }else{
        return(
            <span className="AnswerText">There are currently<br/> no answer for this question!</span>
        );
    }}  

    showSuggestionBox(){
        if(!this.state.hasAcceptedAnswer){
            return (
                <div className="quillSuggestionBox">
                <Quill
                theme="snow"
                modules={this.modules}
                formats={this.formats}
                className="QuillSuggestion"
                onChange={(e,delta,source,content)=>this.handleSuggestionText(e,delta,source,content)}
                placeholder="Your suggestion here..."
            />
            <Button className="submitQuestion" type="primary" onClick={()=>this.handleSuggestion()}>Suggest Edit</Button>
            </div>
            )
        }else{
            return (
                <span>Suggestion: {this.state.suggestion} </span>
            )
        }
    }
    handleSuggestion(){
        if(this.props.history.location.state.author === this.props.currentUser.user.name){
            alert('You can\'t suggest a change to your own question!');
        }else{
            suggestQuestion(this.props.history.location.state.id, this.state.suggestion);
        }
    }

    handleSuggestionText(){
        if(this.props.history.location.state.author === this.props.currentUser.user.name){
            getSuggestion(this.props.history.location.state.id).then((res)=>{
                console.log(res)
                if(res.data !== null){
                    this.setState({
                        suggestion: res.data,
                        hasSuggestion: true,
                        isAuthor: true
                    })
                }
                console.log(this.state)
            })

        }
    }

    handleAcceptSuggestion(){
        if(this.props.history.location.state.author === this.props.currentUser.user.name){
            return(
                <div className="suggestionText">
                    {this.handleSuggestionText()}
                </div>
            )
        }
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
            <div style={{margin:20}}>
                <Header/>
                <div className="AskQuestion-wrapper">
                <div className="inner-wrapper">
                    <span className="AnswerText" style={{fontSize:20}}>question</span>
                    <span className="AnswerText" style={{fontSize:30,margin:30}}>{this.props.history.location.state.question}</span>
                    {this.state.isAuthor && this.state.hasSuggestion && this.showSuggestionBox()}
                    {this.showSuggestionBox()}
                    {this.handleDisplayAnswers()}
                    <span className="AnswerText">Your answer</span>
                    <Quill
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    className="QuillAnswer"
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

