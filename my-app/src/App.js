/* import './App.css';
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
        <input data-testid="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <label>Nom:</label>
        <input data-testid="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" data-testid="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Date de naissance:</label>
        <input data-testid="birth-date" value={formData.birthDate} onChange={handleChange} required />
        {!isAgeValid && (
          <span style={{ color: 'red' }}>
            L'utilisateur ne peut avoir moins de 18 ans.
          </span>
        )}
      </div>
      <div>
        <label>Ville:</label>
        <input data-testid="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div>
        <label>Code postal:</label>
        <input data-testid="postalCode" value={formData.postalCode} onChange={handleChange} required />
      </div>
      <button type="submit" data-testid="submitButton">Enregistrer</button>
    </form>
  );
}
 */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { validateName, validateEmail, validatePostalCode, calculateAge } from "./module";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const watchFields = watch();

  useEffect(() => {
    setIsButtonDisabled(
      !watchFields.firstName ||
      !watchFields.lastName ||
      !watchFields.email ||
      !watchFields.birthDate ||
      !watchFields.city ||
      !watchFields.postalCode
    );
  }, [watchFields]);

  const onSubmit = (data) => {
    if (
      validateName(data.firstName) &&
      validateName(data.lastName) &&
      validateEmail(data.email) &&
      validatePostalCode(data.postalCode) &&
      calculateAge(data)
    ) {
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Enregistrement réussi !");
      reset();
    } else {
      toast.error("Veuillez corriger les erreurs.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Prénom" {...register("firstName", { validate: validateName })} />
      {errors.firstName && <p style={{ color: "red" }}>Prénom invalide</p>}
      
      <input type="text" placeholder="Nom" {...register("lastName", { validate: validateName })} />
      {errors.lastName && <p style={{ color: "red" }}>Nom invalide</p>}
      
      <input type="email" placeholder="Email" {...register("email", { validate: validateEmail })} />
      {errors.email && <p style={{ color: "red" }}>Email invalide</p>}
      
      <input type="date" placeholder="Date de naissance" {...register("birthDate", { validate: calculateAge })} />
      {errors.birthDate && <p style={{ color: "red" }}>Vous devez avoir plus de 18 ans</p>}
      
      <input type="text" placeholder="Ville" {...register("city", { required: true })} />
      {errors.city && <p style={{ color: "red" }}>Ville requise</p>}
      
      <input type="text" placeholder="Code Postal" {...register("postalCode", { validate: validatePostalCode })} />
      {errors.postalCode && <p style={{ color: "red" }}>Code postal invalide</p>}
      
      <button type="submit" disabled={isButtonDisabled}>S'inscrire</button>
    </form>
  );
};

export default RegistrationForm;
