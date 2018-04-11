import React from 'react';
import {AskQuestion} from '../../src/screens/Questions/screens/AskQuestion.screen';
import {shallow} from 'enzyme';
import { expect } from 'chai';


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
        let state = {
            title:'',
            question: '',
            resolved:false
        };
        let currentUser = {user:{name:''}}
      const wrapper = shallow(<AskQuestion history={router} currentUser={currentUser} />).setState(state);  
      console.log(wrapper)
      it('should be a div item', () => { 
             expect(wrapper.type()).to.eql('div');  });
});