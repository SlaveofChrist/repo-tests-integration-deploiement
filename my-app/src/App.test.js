import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import RegistrationForm from "./App";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

beforeEach(() => {
  localStorage.clear();
});

describe.skip("RegistrationForm - Tests d'intégration", () => {
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


    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));
    });


    await waitFor(() => {
      expect(screen.getByText(/Prénom invalide/i)).toBeInTheDocument();
      expect(screen.getByText(/Prénom invalide/i)).toBeInTheDocument();
      expect(screen.getByText(/Nom invalide/i)).toBeInTheDocument();
      expect(screen.getByText(/Email invalide/i)).toBeInTheDocument();
      expect(screen.getByText(/Vous devez avoir plus de 18 ans/i)).toBeInTheDocument();
      expect(screen.getByText(/Code postal invalide/i)).toBeInTheDocument();
    });

    console.log("Erreurs dans le terminal : ", screen.getByText(/prénom invalide/i));

  });

  test("Sauvegarde dans le localStorage et affiche un toaster de succès", () => {
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

    expect(localStorage.getItem("user")).not.toBeNull();
    expect(toast.success).toHaveBeenCalledWith("Enregistrement réussi !");
  });

  test("Affiche un toaster d'erreur si la validation échoue", () => {
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

    expect(toast.error).toHaveBeenCalledWith("Veuillez corriger les erreurs.");
  });
});

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


const request = require("supertest");
const baseURL = process.env.REACT_APP_SERVER_URL;

describe('API /users', () => {
  it.skip('should register a new user with valid data', async () => {
    const userData = {
      lastName: 'Dupont',
      firstName: 'Jean',
      email: `jean.dupont${Date.now()}@example.com`, // pour éviter les doublons
      birthDate: '1990-01-01',
      city: 'Paris',
      postalCode: '75000',
    };
    const response = await request(baseURL)
      .post('/users')
      .send(userData)
      .set('Accept', 'application/json');
    console.log(response.error);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    // Optionnel : vérifier le message exact si connu
    // expect(response.body.message).toBe('Utilisateur enregistré avec succès !');
  });
});
