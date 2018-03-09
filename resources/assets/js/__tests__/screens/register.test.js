import React from 'react';
import {RegisterScreen} from '../../src/screens/auth/screens/registerScreen';
import {shallow} from 'enzyme';
import { expect } from 'chai';


describe('Register item', () => {
      const wrapper = shallow(<RegisterScreen />);  
      it('should be a div item', () => { 
             expect(wrapper.type()).to.eql('div');  });
});