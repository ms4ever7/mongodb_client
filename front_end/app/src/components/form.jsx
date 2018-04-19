import React from 'react';

import '../styles/form.css';

const Form = ({ onClick, onChange, value }) => <div className="App__form">
  <p>Please, fill in some SQL command, here are the collection and its projection that u can fetch:</p>
  <div>cars (name, country, founder, year, series, color)</div>
  <input type="text" value={value} 
    onChange={onChange} className="form-input"
    placeholder="SELECT * FROM cars" />
  <button onClick={onClick} className="form-button">fetch it!</button>
</div>

export default Form;
