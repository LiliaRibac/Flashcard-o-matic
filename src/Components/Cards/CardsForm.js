import React from 'react';
import { useHistory } from 'react-router-dom';
export default function CardsForm({
  onChange,
  onSubmit,
  cardData,
  deckId,
  isAdd,
}) {
  const history = useHistory();
  return (
    <form name='create' onSubmit={onSubmit}>
      <div className='mb-3'>
        <label htmlFor='front' className='form-label'>
          Front
        </label>
        <textarea
          type='text'
          className='form-control'
          id='front'
          name='front'
          placeholder='Front side of card'
          required={true}
          onChange={onChange}
          value={cardData.front}
        ></textarea>
      </div>
      <div className='mb-3'>
        <label htmlFor='back' className='form-label'>
          Back
        </label>
        <textarea
          className='form-control'
          id='back'
          name='back'
          placeholder='Back side of card'
          required={true}
          onChange={onChange}
          value={cardData.back}
        ></textarea>
      </div>
      <button
        type='button'
        className='btn btn-primary mx-2'
        onClick={() => history.push(`/decks/${deckId}`)}
      >
        {isAdd ? 'Done' : 'Cancel'}
      </button>
      <button type='submit' className='btn btn-secondary '>
        {isAdd ? 'Save' : 'Submit'}
      </button>
    </form>
  );
}
