import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1>Welcome to the Best SIM and Mobile Phone Deals</h1>
        <p>Discover the latest and greatest deals on SIM cards and mobile phones. Whether you're looking for a new plan or the latest smartphone, we've got you covered.</p>
        <div className="button-group">
          <Link to="/simdeals">
            <button className="deal-button sim-deal">Explore SIM Deals</button>
          </Link>
          <Link to="/mobiledeals">
            <button className="deal-button mobile-deal">Explore Mobile Phone Deals</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
