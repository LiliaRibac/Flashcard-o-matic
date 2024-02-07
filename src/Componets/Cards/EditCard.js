import React from 'react';
import { readDeck, readCard, updateCard } from '../../utils/api';
import { useState, useEffect } from 'react';
import {
  Link,
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';

export default function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  function handleSubmit() {}
  return (
    <>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <span
                className='oi oi-home mr-1'
                style={{ color: '#0d6efd' }}
              ></span>
              Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to='/'>React Router</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h3>React Router: Add Card</h3>

      <form name='create' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='front' className='form-label'>
            Front
          </label>
          <input
            type='text'
            className='form-control'
            id='front'
            name='front'
            placeholder='Front side of card'
            required={true}
            // onChange={handleChange}
            // value={cardData.front}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='back' className='form-label'>
            Back
          </label>
          <input
            className='form-control'
            id='back'
            name='back'
            placeholder='Back side of card'
            required={true}
            // onChange={handleChange}
            // value={cardData.back}
          />
        </div>
        <button
          type='button'
          className='btn btn-primary mx-2'
          onClick={() => history.push('/')}
        >
          Cancel
        </button>
        <button type='submit' className='btn btn-secondary '>
          Submit
        </button>
      </form>
    </>
  );
}
