import React from 'react';
import CollectionHeader from '../../components/collection-header';
import { shallow } from 'enzyme';

it('should render collection header', () => {
  const tree = shallow(<CollectionHeader collection={['']}/>);
  const expectedTitle = 'Welcome to simple MongoDB client.';

  expect(tree.find('.App__header').length).toEqual(1);
  expect(tree.find('.App__header-wrapper').length).toEqual(1);
  expect(tree.find('.App__logo').length).toEqual(1);
  expect(tree.find('.App__title').length).toEqual(1);
  expect(tree.find('.App__title').text()).toEqual(expectedTitle);
});