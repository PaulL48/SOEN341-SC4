import React from 'react';
import {Login} from '../../src/screens/auth/screens/loginScreen';
import {shallow} from 'enzyme';
import { expect } from 'chai';


describe('Login item', () => {
      const wrapper = shallow(<Login />);  
      it('should be a div item', () => { 
             expect(wrapper.type()).to.eql('div');  });
});