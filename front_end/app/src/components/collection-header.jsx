import React from 'react';

import '../styles/form.css';

const CollectionHeader = ({ collection }) =><div className="App__collection-header">
  {Object.keys(collection)
    .map((title, index) => <div key={index} className="App__collection-header-item">{title}</div>)}
</div>

export default CollectionHeader;