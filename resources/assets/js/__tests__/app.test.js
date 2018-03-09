import React from 'react';
import {App} from '../../js/src/app';
import {shallow} from 'enzyme';
import { expect } from 'chai';


describe('App item', () => {
      const wrapper = shallow(<App />);  
      it('should be a div item', () => { 
             expect(wrapper.type()).to.eql('div');  });
});