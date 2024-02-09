import React from 'react';
import { createDeck } from '../../utils/api';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// This component provides a user interface for creating a new deck
//  by entering its name and description and submitting the form

export default function CreatDeckScreen() {
  // Imports and Initialization
  const history = useHistory();
  const initialDeckFormState = {
    name: '',
    description: '',
  };

  const [deckData, setDeckData] = useState({ ...initialDeckFormState });

  // It prevents the default form submission behavior, creates a new deck
  //and navigates to the newly created deck's page using history.push
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);

    try {
      const newDeck = await createDeck(deckData);
      console.log(newDeck);
      history.push(`/decks/${newDeck.id}`);
    } catch (error) {
      console.error('Error creating deck:', error);
    }
  };

  // It updates the deckData state with the new values entered by the user using setDeckData
  const handleChange = ({ target }) => {
    setDeckData({ ...deckData, [target.name]: target.value });
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
          <li className='breadcrumb-item active' aria-current='page'>
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form name='create' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            placeholder='Deck Name'
            required={true}
            onChange={handleChange}
            value={deckData.name}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            className='form-control'
            id='description'
            name='description'
            placeholder='Brief description of the deck'
            required={true}
            style={{ height: '150px' }}
            onChange={handleChange}
            value={deckData.description}
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
    </div>
  );
}
