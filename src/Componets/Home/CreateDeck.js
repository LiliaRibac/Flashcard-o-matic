import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateDeck() {
  return (
    <div className='row'>
      <div className='col-sm-6 mb-3'>
        <Link to='/' className='btn btn-secondary'>
          <strong>+ </strong>Create Deck
        </Link>
      </div>
    </div>
  );
}
