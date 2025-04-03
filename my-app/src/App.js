import React, { useState, useEffect } from "react";
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
