import React from 'react';
import './App.css';
import JokeList from './JokeList'

function App() {
  return (
    <div className="App">
    <div className='stars'></div>
    <div className='twinkling'></div>
    <div className='clouds'></div>

      <JokeList/>
    </div>
  );
}

export default App;
