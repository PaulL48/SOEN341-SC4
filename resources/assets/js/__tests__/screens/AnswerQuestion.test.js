import React from 'react';
import {AnswerQuestion} from '../../src/screens/Questions/screens/AnswerQuestion.screen';
import {shallow} from 'enzyme';
import { expect } from 'chai';


describe('AnswerQuestion item', () => {
    let router = {
            location:{
                state: {
                    id:1,
                    author:''
                }
            },
            push:()=>{}
        }
    let currentQuestion = {question:''}
    let currentUser = {user:{name:''}}
    
    it("renders 1 <AnswerQuestion /> component", () => {
        const wrapper = shallow(<AnswerQuestion currentUser={currentUser} currentQuestion={currentQuestion} getQuestionActionDispatch={(id)=>{}} history={router}/>);  
        expect(wrapper).to.have.lengthOf(1);
      });
});