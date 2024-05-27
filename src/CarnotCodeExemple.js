<div>
<label>
  Question :
  <input
    type="text"
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
  />
</label>
{demandes &&(
<label>
  Type de question :
  <select value={idTypeQuestion} onChange={(e) => handleTypeChange(e.target.value)}>
  {demandes.typeQuestion.map((typeQuestion) => (
      <option key={typeQuestion.idTypeQuestion} value={typeQuestion.idTypeQuestion}>{typeQuestion.nom}</option>
    ))}

  </select>
</label>
)}

{responses.map((response) => (
  <div key={response.id}>
    <input
      type="text"
      value={response.text}
      onChange={(e) => handleResponseChange(response.id, e.target.value)}
    />
    {idTypeQuestion === '2' ? (
      <input
        type="checkbox"
        checked={response.checked}
        onChange={() =>
          setResponses((prevResponses) =>
            prevResponses.map((prevResponse) =>
              prevResponse.id === response.id
                ? { ...prevResponse, checked: !prevResponse.checked, note : '0' }
                : prevResponse
            )
          )
        }
      />
    ) : (
      <input
        type="radio"
        checked={response.checked}
        onChange={() => handleRadioChange(response.id)}
      />
    )}
    <button onClick={() => handleRemoveResponse(response.id)}>
      Supprimer
    </button>
    {response.checked && (
      <div>
        <label>Note :</label>
        <input
          type="text"
          placeholder="Entrez une note"
          value={response.note}
          onChange={(e) => handleNoteChange(response.id, e.target.value)}
        />
      </div>
    )}
  </div>
))}
<button onClick={handleAddResponse}>Ajouter une réponse</button>
<button onClick={handleSubmit}>Envoyer</button>
</div>