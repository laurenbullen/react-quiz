import React from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './Components/Question';
import QuestionCount from './Components/QuestionCount'

class App extends React.Component {
  render (){
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React Quiz</h2>
      </header>
      <Question content='What is your favorite holiday?' />
      <QuestionCount />
    </div>
  );
}
};

export default App;
