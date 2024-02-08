import React, { useEffect } from 'react';
import { readDeck, createCard } from '../../utils/api';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const initialAddCardState = {
    front: '',
    back: '',
  };

  const [cardData, setCardData] = useState({ ...initialAddCardState });

  const handleChange = ({ target }) => {
    // console.log(target.name, target.value);
    setCardData({ ...cardData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    try {
      const response = await createCard(
        deckId,
        cardData,
        abortController.signal
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setCardData({ ...initialAddCardState });
  };

  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb' style={{ lineHeight: 'inherit' }}>
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
            Add Card
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
            onChange={handleChange}
            value={cardData.front}
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
            onChange={handleChange}
            value={cardData.back}
          />
        </div>
        <button
          type='button'
          className='btn btn-primary mx-2'
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Done
        </button>
        <button type='submit' className='btn btn-secondary '>
          Save
        </button>
      </form>
    </div>
  );
}
