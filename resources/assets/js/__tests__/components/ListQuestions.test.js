import React from 'react';
import {ListC} from '../../src/components/ListQuestions.component';
import { expect } from 'chai';
import {shallow} from 'enzyme';

describe('ListC item', () => {
    const wrapper = shallow(<ListC/>);  
    it('should be a div item', () => { 
            expect(wrapper.type()).to.eql('div');  });
});

