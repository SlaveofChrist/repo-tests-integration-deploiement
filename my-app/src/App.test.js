/* import { render, screen, fireEvent , userEvent} from '@testing-library/react';
import App from './App'; */



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

/* test('affiche un message d\'erreur si l\'âge est inférieur à 18', () => {
  render(<App />);  // Rendre le composant Formulaire
/* 
  // Simuler la saisie d'un prénom, d'un nom, et d'un âge inférieur à 18
  fireEvent.change(screen.getByTestId("firstName"), { target: { value: 'John' } });
  fireEvent.change(screen.getByTestId("lastName"), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByTestId("email"), { target: { value: 'johndoe@gmail.com' } });
  fireEvent.change(screen.getByTestId("birth-date"), { target: { value: 15 } });
  fireEvent.change(screen.getByTestId("city"), { target: { value: 'Nice' } });
  fireEvent.change(screen.getByTestId("postalCode"), { target: { value: '06200' } });
  
  const sendButton = screen.getByTestId('submitButton')
  // Soumettre le formulaire
  fireEvent.click(sendButton); */

  // Vérifier si le message d'erreur est bien affiché

//}); 

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationForm from "./App";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

beforeEach(() => {
  localStorage.clear();
});

describe("RegistrationForm - Tests d'intégration", () => {
  test("Le bouton est désactivé si les champs ne sont pas remplis", () => {
    render(<RegistrationForm />);
    const submitButton = screen.getByRole("button", { name: /s'inscrire/i });
    expect(submitButton).toBeDisabled();
  });

  test("Affiche des erreurs lorsque les champs sont invalides", async () => {
    render(<RegistrationForm />);

    fireEvent.input(screen.getByPlaceholderText("Prénom"), {
      target: { value: "Jean123" },
    });

    fireEvent.input(screen.getByPlaceholderText("Nom"), {
      target: { value: "@Martin" },
    });

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });

    fireEvent.input(screen.getByPlaceholderText("Date de naissance"), {
      target: { value: "2010-01-01" },
    });

    fireEvent.input(screen.getByPlaceholderText("Code Postal"), {
      target: { value: "123A" },
    });

    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    await waitFor(() => {
      expect(screen.getByText(/prénom invalide/i)).toBeInTheDocument();
      expect(screen.getByText(/nom invalide/i)).toBeInTheDocument();
      expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
      expect(screen.getByText(/vous devez avoir plus de 18 ans/i)).toBeInTheDocument();
      expect(screen.getByText(/code postal invalide/i)).toBeInTheDocument();
    });
  });

  test("Sauvegarde dans le localStorage et affiche un toaster de succès", async () => {
    render(<RegistrationForm />);

    fireEvent.input(screen.getByPlaceholderText("Prénom"), {
      target: { value: "Jean" },
    });

    fireEvent.input(screen.getByPlaceholderText("Nom"), {
      target: { value: "Dupont" },
    });

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: { value: "jean.dupont@example.com" },
    });

    fireEvent.input(screen.getByPlaceholderText("Date de naissance"), {
      target: { value: "2000-01-01" },
    });

    fireEvent.input(screen.getByPlaceholderText("Ville"), {
      target: { value: "Paris" },
    });

    fireEvent.input(screen.getByPlaceholderText("Code Postal"), {
      target: { value: "75001" },
    });

    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    await waitFor(() => {
      expect(localStorage.getItem("user")).not.toBeNull();
      expect(toast.success).toHaveBeenCalledWith("Enregistrement réussi !");
    });
  });

  test("Affiche un toaster d'erreur si la validation échoue", async () => {
    render(<RegistrationForm />);

    fireEvent.input(screen.getByPlaceholderText("Prénom"), {
      target: { value: "Jean123" },
    });

    fireEvent.input(screen.getByPlaceholderText("Nom"), {
      target: { value: "Dupont" },
    });

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Veuillez corriger les erreurs.");
    });
  });
});
