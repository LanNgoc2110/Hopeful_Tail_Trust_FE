import React from 'react'
import errorImage from '/assets/error.png';
import './CheckRole.css';

export default function CheckRole({ authMessage }) {
    return (
        <div className='error-page-container'>
            <img src={errorImage} />
            <p>{authMessage.toUpperCase()}</p>
        </div>
    )
}
