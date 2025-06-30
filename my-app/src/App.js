/* import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { validateName, validateEmail, validatePostalCode, calculateAge } from "./module";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();
  
  //console.log(errors);
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
      console.log("Données soumises :", data);
    }
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" data-testid="prenom" placeholder="Prénom" {...register("firstName", { validate: validateName })} />
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
 */

/* import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  let [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const url = process.env.REACT_APP_SERVER_URL
    async function countUsers() {
      try {
        const api = axios.create({
          baseURL: url
        });
        const response = await api.get(`users`);
        console.log(response)
        setUsersCount(response.data.users.length)
      } catch (error) {
        console.error(error);
      }
    }
    countUsers()
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Users manager v2</h1>
        <p>{usersCount} user(s) already registered</p>
      </header>
    </div>
  )
} */

import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    birthDate: "",
    city: "",
    postalCode: "",
  });

  const url = process.env.REACT_APP_SERVER_URL
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (
      !formData.lastName ||
      !formData.firstName ||
      !formData.email ||
      !formData.birthDate ||
      !formData.city ||
      !formData.postalCode
    ) {
      setMessage("Merci de remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(`${url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Utilisateur enregistré avec succès !");
        setFormData({
          lastName: "",
          firstName: "",
          email: "",
          birthDate: "",
          city: "",
          postalCode: "",
        });
      } else {
        const data = await response.json();
        setMessage(data.error || "Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      setMessage("Erreur réseau ou serveur.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom :</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Prénom :</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Date de naissance :</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Ville :</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Code postal :</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Enregistrer</button>

      {message && <p>{message}</p>}
    </form>
  );
}


export default App;