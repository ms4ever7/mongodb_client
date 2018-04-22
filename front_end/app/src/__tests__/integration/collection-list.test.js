import React from 'react';
import CollectionList from '../../components/collection-list';
import { shallow } from 'enzyme';
import CollectionHeader from '../../components/collection-header';

it('should render collection list', () => {
  const expectedObject = { name: 'audi', country: 'germany' };
  const tree = shallow(<CollectionList data={expectedObject}/>);

  const itemWrapper = tree.find('.App__collection-list-item');

  expect(tree.find('.App__collection-list').length).toEqual(1);
  expect(itemWrapper.length).toEqual(2);
  expect(itemWrapper.first().props().children).toEqual('audi');
  expect(itemWrapper.getElements()).toHaveLength(2);
});