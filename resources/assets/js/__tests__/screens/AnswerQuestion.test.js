import React from 'react';
import {AnswerQuestion} from '../../src/screens/Questions/screens/AnswerQuestion.screen';
import {shallow} from 'enzyme';
import { expect } from 'chai';


describe('AnswerQuestion item', () => {
    it("renders 1 <AnswerQuestion /> component", () => {
        const wrapper = shallow(<AnswerQuestion/>);  
        expect(wrapper).to.have.lengthOf(1);
      });
});