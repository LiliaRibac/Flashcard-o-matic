import React from 'react';
import { readDeck, updateDeck } from '../../utils/api';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom/';

// This component provides a user interface for editing the details
// of a specific deck, including its name and description.
export default function EditDeckBtn() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialDeckFormState = {
    name: '',
    description: '',
  };

  const [editDeckData, setEditDeckData] = useState({ ...initialDeckFormState });

  // It fetches the data of the deck,and then sets the editDeckData
  //  state with the fetched deck data.
  useEffect(() => {
    const loadDeck = async () => {
      try {
        const deck = await readDeck(deckId);
        setEditDeckData({ ...deck });
      } catch (error) {
        console.error('Error loading deck:', error);
      }
    };

    loadDeck();
  }, [deckId]);

  //handleChange changes in the input fields of the form
  const handleChange = (event) => {
    setEditDeckData({
      ...editDeckData,
      [event.target.name]: event.target.value,
    });
  };

  //  handleSubmit it prevents the default form submission behavior, updates the deck
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDeck(editDeckData);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log('Error updating error', error);
    }
  };

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
            <Link to={`/decks/${deckId}`}>{editDeckData.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Edit Deck
          </li>
        </ol>
      </nav>
      <h3>Edit Deck</h3>

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
            placeholder='name'
            required={true}
            onChange={handleChange}
            value={editDeckData.name}
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
            placeholder='Enter description'
            required={true}
            onChange={handleChange}
            value={editDeckData.description}
          ></textarea>
        </div>

        <button
          type='button'
          className='btn btn-primary mx-2'
          onClick={() => history.push(`/decks/${deckId}`)}
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
