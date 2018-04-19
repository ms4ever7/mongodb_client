import React from 'react';
import Header from '../../components/header';
import { shallow } from 'enzyme';

it('Should render logo and title', () => {
  const tree = shallow(<Header />);
  const expectedTitle = 'Welcome to simple MongoDB client.';

  expect(tree.find('.App__header').length).toEqual(1);
  expect(tree.find('.App__header-wrapper').length).toEqual(1);
  expect(tree.find('.App__logo').length).toEqual(1);
  expect(tree.find('.App__title').length).toEqual(1);
  expect(tree.find('.App__title').text()).toEqual(expectedTitle);
});