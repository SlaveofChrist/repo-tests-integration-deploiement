import {calculateAge,  validateName, validateEmail, validatePostalCode} from "./module"
let people20years;
beforeEach(() =>{
    let date = new Date();
    people20years = {
        birth: new Date(date.setFullYear(date.getFullYear() - 20 ))
    };
})

/**
 * @function calculateAge
 */

describe('calculateAge Unit Test Suites', ()=>{
    it('should return a correct age',()=> {
        expect(calculateAge(people20years)).toEqual(20)
    }),
    it('should throw a "missing param p" error', () => {
        expect(() => calculateAge()).toThrow("missing param p")
    })
       
})

/**
 * Test the validateName function with valid names.
 */
test("validateName - accepte les noms valides", () => {
    expect(validateName("Jean Dupont")).toBe(true);
    expect(validateName("Éléonore")).toBe(true);
    expect(validateName("O'Connor")).toBe(true);
  });
  
  /**
   * Test the validateName function with invalid names.
   */
  test("validateName - rejette les noms invalides", () => {
    expect(validateName("Jean123")).toBe(false);
    expect(validateName("$$$")).toBe(false);
  });
  
  /**
   * Test the validateEmail function with valid emails.
   */
  test("validateEmail - accepte les emails valides", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user.name@domain.co")).toBe(true);
  });
  
  /**
   * Test the validateEmail function with invalid emails.
   */
  test("validateEmail - rejette les emails invalides", () => {
    expect(validateEmail("test@com")).toBe(false);
    expect(validateEmail("user@.com")).toBe(false);
  });
  
  /**
   * Test the validatePostalCode function with valid French postal codes.
   */
  test("validatePostalCode - accepte les codes postaux français", () => {
    expect(validatePostalCode("75001")).toBe(true);
  });
  
  /**
   * Test the validatePostalCode function with invalid postal codes.
   */
  test("validatePostalCode - rejette les codes non valides", () => {
    expect(validatePostalCode("7500A")).toBe(false);
    expect(validatePostalCode("123456")).toBe(false);
  });
