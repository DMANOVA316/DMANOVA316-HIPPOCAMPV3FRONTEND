import React, { useState, useRef, useEffect } from 'react';

const QuizForm = () => {
  const [question, setQuestion] = useState('');
  const [choiceType, setChoiceType] = useState('single');
  const [choices, setChoices] = useState(['']);
  const [newChoice, setNewChoice] = useState('');
  const [showChoices, setShowChoices] = useState(false);
  const choicesRef = useRef(choices);

  useEffect(() => {
    choicesRef.current = choices;
  }, [choices]);

  const toggleChoiceInput = () => {
    setChoiceType(document.getElementById('choiceType').value);
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const addChoice = () => {
    if (newChoice.trim() !== '') {
      setChoices([...choices, newChoice]);
      setNewChoice('');
      setShowChoices(true);
    }
  };

  const removeChoice = (index) => {
    setChoices((prevChoices) => {
      const updatedChoices = [...prevChoices];
      updatedChoices.splice(index, 1);
      return updatedChoices;
    });
    setShowChoices(choicesRef.current.length > 1); // Met à jour l'affichage en fonction de la version la plus récente
  };
  

  const createChoiceInputs = (type) => {
    return choices.map((choice, index) => (
      <div key={index} className="flex items-center mb-2">
        <input
          type={type}
          name="choices"
          value={choice}
          id={`choice${index + 1}`}
          onChange={(e) => handleChoiceChange(index, e.target.value)}
          className="mr-2"
        />
        <label htmlFor={`choice${index + 1}`}>{choice}</label>
        {choices.length > 1 && (

          <button type="button" onClick={() => removeChoice(index)} className="ml-2 text-red-600">
            Remove
          </button>
        )}
      </div>
    ));
  };

  return (
    <form className="max-w-md mx-auto mt-8 p-4 bg-gray-100 shadow-md">
      <label htmlFor="question" className="block text-sm font-medium text-gray-700">
        Question:
      </label>
      <input
        type="text"
        id="question"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        required
      />

      <label htmlFor="choiceType" className="block mt-4 text-sm font-medium text-gray-700">
        Select Choice Type:
      </label>
      <select
        id="choiceType"
        name="choiceType"
        onChange={toggleChoiceInput}
        value={choiceType}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
      >
        <option value="single">Single Choice</option>
        <option value="multiple">Multiple Choice</option>
      </select>

      <div id="choiceInputContainer" className="mt-4">
        <label htmlFor="choice" className="block text-sm font-medium text-gray-700">
          Choices:
        </label>
        {showChoices && (
          <div id="choiceInput">{createChoiceInputs(choiceType === 'single' ? 'radio' : 'checkbox')}</div>
        )}
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={newChoice}
            onChange={(e) => setNewChoice(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded-md"
            placeholder="New Choice"
          />
        <button type="button" onClick={addChoice} className="p-2 bg-green-500 text-white rounded-md">
          Add Choice
        </button>
      </div>
    </div>

      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>
    </form>
  );
};


function AddReponseQuiz() {
  return (
    <div className="App">
      <QuizForm />
    </div>
  );
}

export default AddReponseQuiz;
