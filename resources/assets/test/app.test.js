import React from 'react';
import App from '../js/src/app';


describe('App item', () => {
      const wrapper = shallow(<App />);  
      it('should be a div item', () => { 
             expect(wrapper.type()).to.eql('div');  });
});