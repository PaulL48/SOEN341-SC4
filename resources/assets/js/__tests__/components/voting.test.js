import React from 'react';
import {Voting} from '../../src/components/voting.component';
import { expect } from 'chai';
import {shallow} from 'enzyme';

describe('Voting item', () => {
    const wrapper = shallow(<Voting/>);  
    it('should be a div item', () => { 
            expect(wrapper.type()).to.eql('div');  });
});

