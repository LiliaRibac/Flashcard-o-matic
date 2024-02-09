import React from 'react';
import { readDeck, readCard, updateCard } from '../../utils/api';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import CardsForm from './CardsForm';
// This component allows users to edit an existing card
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

  // It fetches the data of the deck and the card being edited using the readDeck and readCard functions,
  //  when either the deckId or cardId changes.
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
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h3>Edit Card</h3>

      <CardsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        cardData={formData}
        deckId={deckId}
        isAdd={false}
      />
    </>
  );
}
