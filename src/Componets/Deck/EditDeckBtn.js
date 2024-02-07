import React from 'react';
import { readDeck, updateDeck } from '../../utils/api';
import { useState, useEffect } from 'react';
import {
  Link,
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';

export default function EditDeckBtn() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialDeckFormState = {
    name: '',
    description: '',
  };

  const [editDeckData, setEditDeckData] = useState({ ...initialDeckFormState });

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

  const handleChange = (event) => {
    setEditDeckData({
      ...editDeckData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDeck(editDeckData);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log('Error updating error', error);
    }
  };
  // return <div>edit deck</div>;
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
            {/* <Link to='/'>Rendering in React</Link> */}
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
            name='description' // Corrected spelling here
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
