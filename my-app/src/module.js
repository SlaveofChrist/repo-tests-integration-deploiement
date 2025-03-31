/**
 * Calculate a person's age in years
 * 
 * @param {object} p An object representing a person, implementing a birth Date parameter. 
 * @return {number} The age in years of p
 */
function calculateAge(p){
    if(!p) {
        throw new Error("missing param p")
        }
    //if(p )   
    let dateDiff = new Date(Date.now() - p.birth.getTime())
    let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
    return age
}

/**
 * Validate a person's name.
 *
 * @param {string} name The name to validate.
 * @return {boolean} True if the name is valid, otherwise false.
 */
 const validateName = (name) => {
    return /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name);
  };
  
  /**
 * Validate an email address.
 *
 * @param {string} email The email to validate.
 * @return {boolean} True if the email is valid, otherwise false.
 */
    const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email);
  };
  
  /**
 * Validate a French postal code.
 *
 * @param {string} postalCode The postal code to validate.
 * @return {boolean} True if the postal code is valid, otherwise false.
 */
  const validatePostalCode = (postalCode) => {
    return /^[0-9]{5}$/.test(postalCode);
  };

export {calculateAge,validateName,validateEmail,validatePostalCode}