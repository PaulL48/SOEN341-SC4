import React from 'react';
import {AnswerVoting} from '../../src/components/AnswerVoting.component';
import { expect } from 'chai';
import {shallow} from 'enzyme';

describe('AnswerVoting item', () => {
    const wrapper = shallow(<AnswerVoting/>);  
    it('should be a div item', () => { 
            expect(wrapper.type()).to.eql('div');  });
});

