import './App.css';
import { calculateAge } from './module';
import React, { useState } from 'react';

export default function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    city: '',
    postalCode: '',
  });

  const [isAgeValid, setIsAgeValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Données soumises:', formData);
    if(calculateAge(formData.birthDate)<18){
      setIsAgeValid(false)
    }
    alert('Utilisateur enregistré avec succès !');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <div>
        <label>Prénom:</label>
        <input id="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <label>Nom:</label>
        <input id="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Date de naissance:</label>
        <input id="birth-date" value={formData.birthDate} onChange={handleChange} required />
        {!isAgeValid && (
          <span style={{ color: 'red' }}>
            L'utilisateur ne peut avoir moins de 18 ans.
          </span>
        )}
      </div>
      <div>
        <label>Ville:</label>
        <input id="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div>
        <label>Code postal:</label>
        <input id="postalCode" value={formData.postalCode} onChange={handleChange} required />
      </div>
      <button type="submit" id="submitButton">Enregistrer</button>
    </form>
  );
}
