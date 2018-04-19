import React from 'react';
import Form from '../../components/form';
import { shallow } from 'enzyme';

describe('Test from component', () => {
  const mockButtonFn = jest.fn();
  const tree = shallow(<Form value='value test' onClick={mockButtonFn} onChange={mockButtonFn} />);

  it('Form should contain input value from props', () => {
    const input = tree.find('.form-input');
  
    expect(typeof(input.getElement(0).props.value)).toBe('string')
    expect(input.getElement(0).props.value).toEqual('value test');
  });
  
  it('Form should contain events from props ', () => {
    const button = tree.find('.form-button');
  
    button.simulate('click');
    expect(mockButtonFn.mock.calls.length).toEqual(1);

    button.simulate('change');
    expect(mockButtonFn.mock.calls.length).toEqual(1);
  });

})