import { apiUrl } from "../../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * @async
 * @function loginUser
 * @description Action asynchrone pour connecter l'utilisateur via l'API et stocker le token dans l'état Redux.
 * @param {Object} userData - Les données de connexion de l'utilisateur (email et mot de passe).
 * @param {Function} rejectWithValue - Fonction utilisée pour retourner une valeur de rejet si la requête échoue.
 * @returns {Promise<Object>} - Retourne un objet contenant les données de la réponse, y compris le token.
 * @throws {Error} - Lance une erreur si la requête échoue et aucune réponse de l'API n'est disponible.
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Envoi d'une requête POST à l'API pour l'authentification
      const response = await axios.post(`${apiUrl}/login`, userData);
      
      // Récupération du token depuis la réponse
      const token = response.data.body.token;

      // Retourne les données de la réponse avec le token
      return { ...response.data, token };
    } catch (error) {
      console.log("API error:", error);

      // Si aucune réponse n'est disponible, lance l'erreur
      if (!error.response) {
        throw error;
      }

      // Retourne l'erreur via rejectWithValue si la réponse API contient un message d'erreur
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * @constant initialState
 * @type {Object}
 * @description État initial du slice d'authentification.
 * @property {Object|null} user - Informations de l'utilisateur après connexion.
 * @property {string|null} token - Jeton JWT de l'utilisateur pour l'authentification.
 * @property {boolean} loading - Indique si une requête de connexion est en cours.
 * @property {Object|null} error - Stocke les éventuelles erreurs de connexion.
 */
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

/**
 * @function authSlice
 * @description Slice Redux pour gérer l'authentification, comprenant les reducers synchrones et asynchrones.
 * @returns {Object} - Retourne l'état modifié basé sur les actions.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,

  // Reducers synchrones : gestion des actions simples comme logout et reset
  reducers: {
    /**
     * @function logout
     * @description Déconnecte l'utilisateur en réinitialisant les informations d'authentification.
     * @param {Object} state - L'état actuel.
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
    },

    /**
     * @function reset
     * @description Réinitialise complètement l'état d'authentification.
     * @param {Object} state - L'état actuel.
     */
    reset: (state) => initialState,
  },

  // Gestion des actions asynchrones via extraReducers
  extraReducers: (builder) => {
    builder
      /**
       * @description Déclenché lorsque la connexion est en cours (requête envoyée mais pas encore terminée).
       * @param {Object} state - L'état actuel.
       */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      /**
       * @description Déclenché lorsque la connexion est réussie. Met à jour l'état avec l'utilisateur et le token.
       * @param {Object} state - L'état actuel.
       * @param {Object} action - L'action renvoyée par l'API contenant les données de l'utilisateur et le token.
       */
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Stocke les infos utilisateur
        state.token = action.payload.token; // Stocke le token
      })
      
      /**
       * @description Déclenché lorsque la connexion échoue. Met à jour l'état avec l'erreur reçue.
       * @param {Object} state - L'état actuel.
       * @param {Object} action - L'action contenant les informations d'erreur.
       */
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Stocke l'erreur
      });
  },
});

// Export des actions synchrones logout et reset
export const { logout, reset } = authSlice.actions;

// Export du reducer par défaut pour être utilisé dans le store
export default authSlice.reducer;
