import React from 'react';
import {AskQuestion} from '../../src/screens/Questions/screens/AskQuestion.screen';
import {shallow} from 'enzyme';
import { expect } from 'chai';


describe('AskQuestion item', () => {
      const wrapper = shallow(<AskQuestion />);  
      it('should be a div item', () => { 
             expect(wrapper.type()).to.eql('div');  });
});