import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing-section'>
      <div className='hero-container'>
        <h1>OpenGuitar</h1>
        <p className='lead'>
          A platform built to connect current and aspiring guitar players around the world and provide them with free,
          concise reference documentation and video lessons.
        </p>
        <div className='hero-buttons'>
          <Link to='/register' className='btn btn-primary'>
            Register
          </Link>
          <Link to='/login' className='btn btn-secondary'>
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
