import React from 'react';

import '../styles/form.css';

const fetchCollectionObject = value => {
  const collectionObject = Object.keys(value).map(key => `${key}: ${value[key]}`).join('; ');

  return collectionObject;
}

const CollectionList = ({ data }) => <div className="App__collection-list">
  {Object.values(data)
    .map((value, index) => {
      if (typeof value === 'object') {
        return <div key={index} className="App__collection-list-item">{fetchCollectionObject(value)}</div>
      }

      return <div key={index} className="App__collection-list-item">{value}</div>
  })}
</div>;

export default CollectionList;