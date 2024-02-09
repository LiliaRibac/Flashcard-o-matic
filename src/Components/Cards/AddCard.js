import React, { useEffect } from 'react';
import { readDeck, createCard } from '../../utils/api';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import CardsForm from './CardsForm';
// This component allows users to add a new card to a specified deck,

export default function AddCard() {
  // State Initialization

  const [deck, setDeck] = useState({});
  const history = useHistory();
  const { deckId } = useParams();
  const initialAddCardState = {
    front: '',
    back: '',
  };

  const [cardData, setCardData] = useState({ ...initialAddCardState });

  // Function to handle changes in the input fields of the form.
  const handleChange = ({ target }) => {
    console.log(target.name, target.value);
    setCardData({ ...cardData, [target.name]: target.value });
  };

  // function to handle form submission
  // create a new card using the createCard function with the deckId and cardData
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
  // Hook that runs after the component is rendered.
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

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
            <Link to='/'>{deck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{deck.name}: Add Card</h3>

      <CardsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        cardData={cardData}
        deckId={deckId}
        isAdd={true}
      />
    </div>
  );
}
