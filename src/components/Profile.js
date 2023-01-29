import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/Profile.css';

function Profile() {
  const [emailProfile, setEmailProfile] = useState('');
  const history = useHistory();

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    setEmailProfile(userEmail?.email);
  }, [setEmailProfile]);

  return (
    <div className="btnProfile">
      <Header />
      <h1 data-testid="profile-email" className="emailProfile">{emailProfile}</h1>
      <button
        className="buttonDR"
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        className="buttonFR"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        className="buttonLogout"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          setEmailProfile('');
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
