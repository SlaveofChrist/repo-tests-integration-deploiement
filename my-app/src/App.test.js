import { render, screen, fireEvent , userEvent} from '@testing-library/react';
import App from './App';



/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

/* test('check counter on click me button', () => {
  render(<App />);
  const sendButton = screen.getByTestId('submitButton')
  const spanErrorAge = screen.getByTestId('error-birth-age')
  expect(sendButton).toBeInTheDocument();
  userEvent.type(screen.getByTestId('birth-date'), 18)
  fireEvent.click(sendButton);
  expect(spanErrorAge)

});
 */

test('affiche un message d\'erreur si l\'âge est inférieur à 18', () => {
  render(<App />);  // Rendre le composant Formulaire

  // Simuler la saisie d'un prénom, d'un nom, et d'un âge inférieur à 18
  fireEvent.change(screen.getByTestId("firstName"), { target: { value: 'John' } });
  fireEvent.change(screen.getByTestId("lastName"), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByTestId("email"), { target: { value: 'johndoe@gmail.com' } });
  fireEvent.change(screen.getByTestId("birth-date"), { target: { value: 15 } });
  fireEvent.change(screen.getByTestId("city"), { target: { value: 'Nice' } });
  fireEvent.change(screen.getByTestId("postalCode"), { target: { value: '06200' } });
  
  const sendButton = screen.getByTestId('submitButton')
  // Soumettre le formulaire
  fireEvent.click(sendButton);

  // Vérifier si le message d'erreur est bien affiché
  expect(screen.getByText(/l'utilisateur ne peut avoir moins de 18 ans/i)).toBeInTheDocument();
});