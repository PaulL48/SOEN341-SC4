import React from 'react';
import {HeaderComponent} from '../../src/components/header.component';
import { expect } from 'chai';
import {shallow} from 'enzyme';

describe('test', () => {
    const wrapper = shallow(<HeaderComponent/>);  
    it('should be a div item', () => { 
            expect(wrapper.type()).to.eql('div');  });
});


