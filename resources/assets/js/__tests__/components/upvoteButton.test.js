import React from 'react';
import {UpButton} from '../../src/components/upvoteButton.component';
import { expect } from 'chai';
import {shallow} from 'enzyme';

describe('UpButton item', () => {
    const wrapper = shallow(<UpButton/>);  
    it('should be a div item', () => { 
            expect(wrapper.type()).to.eql('div');  });
});

