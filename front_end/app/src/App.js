import React, { Component } from 'react';
import './App.css';

import Header from './components/header';
import Form from './components/form';

import CarsManager from './services/cars-manager';

class App extends Component {
  state = {
    sqlString: '',
    collection: []
  }

  fetchData = () => {
    const { sqlString } = this.state;

    return CarsManager.fetch(sqlString)
      .then(({ data }) => this.setState({ collection: data }))
      // TODO: Create error handling for bad requests
      .catch(err => console.error('Error', err));
  }

  //TODO: move it to component
  get collection() {
    const { collection } = this.state;

    if (!collection.length) {
      return null;
    }

    const collectionList = collection
      .map(data => <div className="App__collection-list">{Object.values(data)
      .map((value, index) => <div key={index} className="App__collection-list-item">{value}</div>)}
      </div>);

    return <div className="App__collection-container">
      {collectionList}
    </div>
  }

  //TODO: move it to component
  get collectionHeader() {
    const { collection } = this.state;

    if (!collection.length) {
      return null;
    }

    const headersList = Object.keys(collection[0])
      .map((title, index) => <div key={index} className="App__collection-header-item">{title}</div>)

    return <div className="App__collection-header">
      {headersList}
    </div>
  }

  render() {
    const { sqlString } = this.state;

    return (
      <div className="App">
        <Header />
        <Form value={sqlString}
          onClick={this.fetchData}
          onChange={e => this.setState({ sqlString: e.target.value })} />
        <section>  
          {this.collectionHeader}
          {this.collection}
        </section>
      </div>
    );
  }
}

export default App;
