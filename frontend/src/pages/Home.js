import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <p className="eyebrow">A quieter place for loud ideas</p>
        <h1>Find the book that stays with you.</h1>
        <p className="hero-copy">Discover thoughtful reads, familiar favorites, and your next great escape in one carefully curated catalogue.</p>
        <Link to="/catalogue" className="btn btn-primary btn-lg">Browse Catalogue</Link>
      </section>
      <div className="home-notes">
        <span>01 / Browse freely</span>
        <span>02 / Keep your picks close</span>
        <span>03 / Order when ready</span>
      </div>
    </div>
  );
}

export default Home;