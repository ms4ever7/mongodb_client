import React from 'react';
import CollectionHeader from '../../components/collection-header';
import { shallow } from 'enzyme';

it('should render collection header', () => {
  const expectedObject = { name: 'audi', country: 'germany' };
  const tree = shallow(<CollectionHeader collection={expectedObject}/>);

  const collectionWrapper = tree.find('.App__collection-header-item');

  expect(tree.find('.App__collection-header').length).toEqual(1);
  expect(tree.find('.App__collection-header-item').length).toEqual(2);
  expect(collectionWrapper.getElements()).toHaveLength(2);
});