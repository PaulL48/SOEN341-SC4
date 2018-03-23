import React from 'react';
import {AskQuestion, handleSubmit} from '../../src/screens/Questions/screens/AskQuestion.screen';
import {shallow} from 'enzyme';
import { expect } from 'chai';
import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';

describe('AskQuestion item', () => {
      let router = {
            location:{
                state: {
                    id:1,
                    author:''
                }
            },
            push:()=>{}
        }
        let currentUser = {user:{name:''}}
        let state = {
            title:'',
            question: '',
            resolved:false
        }
      const wrapper = shallow(<AskQuestion history={router} currentUser={currentUser} />).setState(state);  
      it('should be a div item', () => { 
             expect(wrapper.type()).to.eql('div');  });
});

/*
describe('handleSubmit', ()=>{
    it('handles the submission of question data', done => {
        var mock = new MockAdapter(Axios);
        const data= {
            title: '',
            question: '',
            resolved: false
        };
        mock.onGet('/ask').reply(200, data);

        Axios.request({
            url:'/ask',
            method:'post',
            data
        }).then((res)=>{
            console.log(res);
            this.props.history.push("/");
        }).catch((err)=>{
            console.log(err);
        });
      }
    )

})
*/