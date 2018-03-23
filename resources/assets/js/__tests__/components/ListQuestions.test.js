import React from 'react';
import {ListC} from '../../src/components/ListQuestions.component';
import { expect } from 'chai';
import {shallow} from 'enzyme';

describe('ListC item', () => {
    let results = [
        {
            title: '',
            author: '',
            created_at: '',
            resolved: false  
        },
    ]
    const wrapper = shallow(<ListC data={results}/>);  
    it('should be a div item', () => { 
            expect(wrapper.type()).to.eql('div');  });
});
