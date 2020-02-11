import React, { useState } from 'react';
import Progress from './Component/Progress'
import Question from './Component/Question'
import Answers from './Component/Answers'
import './App.css';

function App() {
  // const initialState ={
  //   currenQuestion : 0,
  //   currentAnswer : '',
  //   answers : [],
  //   showResults : false,
  //   error : ''
  // }

  const [currenQuestion, setCurrentQuestion] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState(0)
  const [answers, setAnswers] = useState([])
  const [error, setError] = useState('')
  const [showResults, setShowResults] = useState(false)
  const questions = [
    {
        id: 1,
        question: 'Which statement about Hooks is not true?',
        answer_a:
            'Hooks are 100% backwards-compatible and can be used side by side with classes',
        answer_b: 'Hooks are still in beta and not available yet',
        answer_c:
            "Hooks are completely opt-in, there's no need to rewrite existing code",
        answer_d: 'All of the above',
        correct_answer: 'b',
    },
    {
        id: 2,
        question: 'Which one is not a Hook?',
        answer_a: 'useState()',
        answer_b: 'useConst()',
        answer_c: 'useReducer()',
        answer_d: 'All of the above',
        correct_answer: 'b',
    },
    {
        id: 3,
        question: 'What Hook should be used for data fetching?',
        answer_a: 'useDataFetching()',
        answer_b: 'useApi()',
        answer_c: 'useEffect()',
        answer_d: 'useRequest()',
        correct_answer: 'c',
    },
];


  const question = questions[currenQuestion]

  const handleClick = e =>{
    setCurrentAnswer(e.target.value);
    setError('')
  }
  const renderError = () =>{
    if(!error){
      return
    }

    return <div className = 'error'> {error}</div>
  }

  const renderResultMark = (question, answer) =>{
    if (question.correct_answer === answer.answer){
      return <span className ='correct'>correct</span>
    }
    return <span className = 'failed'>failed</span>
  }
  const renderResultsData =()=>{
    return answers.map( answer =>{
      const question = questions.find(
        question => question.id === answer.questionId
        );
        return (
          <div key ={question.id}>
            {question.question} - {renderResultMark (question,answer)}
          </div>
        )
    })
  }

  const restart =() =>{
    setAnswers([])
    setCurrentAnswer('')
    setCurrentQuestion(0)
    setShowResults(false)

  };

  const next = () =>{
    const answer = {questionId:question.id, answer: currentAnswer}
    if (!currentAnswer){
      setError('Please select an option')
      return
    }
    answers.push(answer);
    setAnswers(answers)
    setCurrentAnswer('')

    if (currenQuestion + 1 < questions.length){
      setCurrentQuestion (currenQuestion +1);
      return;
    }
    setShowResults(true);
  }

  if(showResults){
    return (
      <div className = 'container results'>
          <h2>Results</h2>
            <ul> {renderResultsData()} </ul>
          <button className = 'btn btn-primary' onClick ={restart}>  
              Restart
           </button>
      </div>
      )
  }else{

  
  return (
    <div className="container">

      <Progress total = {questions.length} current ={currenQuestion + 1}/>
      <Question question = {question.question}/>
      {renderError()}
      <Answers 
        question={question} 
        currentAnswer={currentAnswer} 
        handleClick = {handleClick}
        />
      
      <button className = 'btn btn-primary' onClick ={next}>  
        Confirm and Continue
      </button>
    
    </div>
  );
}}

export default App;