import React from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/Question';
import QuestionCount from './components/QuestionCount'
import quizQuestions from './api/quizQuestions'
import Quiz from './components/Quiz';
import Result from './components/Result'

class App extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: ''
    }
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }
  
  componentDidMount(){
    const shuffledAnswerOptions = quizQuestions.map(question => this.shuffleArray(question.answers));

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    })
  };

  shuffleArray(array) {
    var currentIndex = array.length, temoporaryValue, randomIndex;

    // while there remain elements to shuffle...
    while (0 !== currentIndex){

      // pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // and swap it with the current element.
      temoporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temoporaryValue

    }
    return array;
  }

  setUserAnswer(answer) {
    this.setState((state) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if(this.state.questionId < quizQuestions.length){
      setTimeout(() => this.setNextQuestion(), 300);
    } else {

    }
  }

  getResults(){
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount)
  };

  setResults(result) {
    if(result.length === 1){
      this.setState({result: result[0]});
    } else {
      this.setState({result: 'Undetermined'}); 
    }
  }

  renderQuiz() {
    return(
      <Quiz 
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    )
  }

  render (){
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React Quiz</h2>
      </header>
      
      {this.state.result ? this.renderResult() : this.renderQuiz()}
      {/* <Question content='What is your favorite holiday?' /> */}
      {/* <QuestionCount /> */}
    </div>
  );
}
};

export default App;
