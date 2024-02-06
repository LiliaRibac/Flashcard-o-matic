import React from 'react';
import { deleteCard } from '../../utils/api';

export default function deleteCardButton({ cardId }) {
  return (
    <>
      <button onClick={handleDelete}>
        <span className='oi oi-trash' />
      </button>
    </>
  );
}
