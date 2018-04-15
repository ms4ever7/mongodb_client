import React, { Component } from 'react';
import './App.css';

import Header from './components/header';
import Form from './components/form';

import CollectionList from './components/collection-list';
import CollectionHeader from './components/collection-header';

import CarsManager from './services/cars-manager';

class App extends Component {
  state = {
    sqlString: 'SELECT * FROM cars',
    collection: [],
    errorMessage: ''
  }

  fetchData = async () => {
    const { sqlString } = this.state;

    if (!sqlString) {
      return this.setState({ errorMessage: 'SQL command cannnot be blank' })
    }

    try {
      const { data } = await CarsManager.fetch(sqlString);

      this.setState({ collection: data, errorMessage: '' });
    } catch ({ response }) {
      this.setState({ errorMessage: response.data, collection: [] });
    }
  }

  get collection() {
    const { collection } = this.state;

    if (!collection.length) {
      return null;
    }

    return <div className="App__collection-container">
      {collection.map((data, index) => <CollectionList key={index} data={data}/>)}
    </div>
  }

  get collectionHeader() {
    const { collection } = this.state;

    if (!collection.length) {
      return null;
    }

    return <CollectionHeader collection={collection[0]} />
  }

  get error() {
    const { errorMessage } = this.state;

    if (!errorMessage) {
      return null;
    }

    return <div className="App__error-message">{errorMessage}</div>
  }

  render() {
    const { sqlString } = this.state;

    return (
      <div className="App">
        <Header />
        <Form value={sqlString}
          onClick={this.fetchData}
          onChange={e => this.setState({ sqlString: e.target.value })} />
          {this.error}
        <section>
          {this.collectionHeader}
          {this.collection}
        </section>
      </div>
    );
  }
}

export default App;
