import React from 'react';
import {Button2} from '../../src/components/downvoteButton.component';
import { expect } from 'chai';
import {shallow} from 'enzyme';

describe('Button2 item', () => {
    it("renders 1 <Button2 /> component", () => {
        const wrapper = shallow(<Button2/>);  
        expect(wrapper).to.have.lengthOf(1);
      });
});
