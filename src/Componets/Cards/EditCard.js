import React from 'react';
import { readDeck, readCard, updateCard } from '../../utils/api';
import { useState, useEffect } from 'react';
import {
  Link,
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import './EditCard.css';

export default function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const initialEditCardState = {
    front: '',
    back: '',
  };
  const [formData, setFormData] = useState({ ...initialEditCardState });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
        const cardData = await readCard(cardId);
        setCard(cardData);
        setFormData({ front: cardData.front, back: cardData.back });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [deckId, cardId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCard({ ...card, ...formData });
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error.message);
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
            {/* <Link to='/'>React Router</Link> */}
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h3>Edit Card</h3>

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
            value={formData.front}
          />
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
            onChange={handleChange}
            value={formData.back}
          ></textarea>
        </div>
        {/* <div
          className='input-scroll-container'
          style={{ height: '300px', overflowY: 'scroll' }}
        >
          <input
            type='text'
            className='form-control'
            placeholder='Enter text.dfdf..'
          />
        </div> */}

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
