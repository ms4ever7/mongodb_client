import React from 'react';

import '../styles/form.css';

const Form = ({ onClick, onChange, value }) => <div className="App__form">
  <p>Please, fill in some SQL command, here are the collections that u can fetch:</p>
  <ul>
    <li>Cars</li>
  </ul>
  <input type="text" value={value} 
    onChange={onChange} className="form-input"
    placeholder="SELECT * FROM Cars" />
  <button onClick={onClick} className="form-button">fetch it!</button>
</div>

export default Form;