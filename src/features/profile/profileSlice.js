import { apiUrl } from "../../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../../app/store";

/**
 * Récupère le profil utilisateur depuis l'API en utilisant le token stocké.
 * 
 * @async
 * @function fetchUserProfile
 * @param {Object} thunkAPI - Objet contenant des méthodes Redux comme rejectWithValue.
 * @returns {Object} - Les données du profil utilisateur si la requête réussit.
 * @throws {Object} - Une erreur si la requête échoue ou si aucun token n'est trouvé.
 */
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = store.getState().auth.token; // Récupère le token depuis l'état auth
      if (!token) {
        throw new Error("No token found"); // Gère le cas où le token est manquant
      }
      const response = await axios.post(
        `${apiUrl}/profile`, // URL de l'API
        {}, // Corps de la requête vide
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajoute le token dans les en-têtes de la requête
          },
        }
      );
      return response.data; // Retourne les données du profil depuis l'API
    } catch (error) {
      console.log("Erreur API profil:", error);
      if (!error.response) {
        throw error; // Si aucune réponse de l'API, lance l'erreur
      }
      return rejectWithValue(error.response.data); // Retourne l'erreur de l'API
    }
  }
);

/**
 * Met à jour le profil utilisateur en envoyant un nouveau nom d'utilisateur à l'API.
 * 
 * @async
 * @function updateUserProfile
 * @param {string} userName - Le nouveau nom d'utilisateur à mettre à jour dans le profil.
 * @param {Object} thunkAPI - Objet contenant des méthodes Redux comme rejectWithValue.
 * @returns {Object} - Les données du profil mises à jour si la requête réussit.
 * @throws {Object} - Une erreur si la requête échoue ou si aucun token n'est trouvé.
 */
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const token = store.getState().auth.token; // Récupère le token depuis l'état auth
      if (!token) {
        throw new Error("Aucun token trouvé"); // Gère le cas où le token est manquant
      }
      const response = await axios.put(
        `${apiUrl}/profile`, // URL de l'API
        { firstName: userData.firstName, lastName: userData.lastName }, // Données avec les nouveaux nom et prénom
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajoute le token dans les en-têtes de la requête
          },
        }
      );
      return response.data; // Retourne les données du profil mises à jour depuis l'API
    } catch (error) {
      console.log("Erreur API mise à jour du profil:", error);
      if (!error.response) {
        throw error; // Si aucune réponse de l'API, lance l'erreur
      }
      return rejectWithValue(error.response.data); // Retourne l'erreur de l'API
    }
  }
);

/**
 * État initial pour le slice profil.
 * 
 * @typedef {Object} InitialState
 * @property {Object|null} profile - Les données du profil utilisateur (initialement null).
 * @property {boolean} loading - Indique si une requête est en cours.
 * @property {Object|null} error - Stocke les erreurs éventuelles pendant les requêtes.
 */
const initialState = {
  profile: null,
  loading: false,
  error: null,
};

/**
 * Slice pour gérer l'état du profil utilisateur.
 */
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    /**
     * Réinitialise l'état du profil à ses valeurs initiales.
     * 
     * @param {Object} state - L'état actuel du slice.
     */
    resetProfile: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      /**
       * Gère l'état pending du thunk fetchUserProfile.
       * 
       * @param {Object} state - L'état actuel du slice.
       */
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true; // Indique que la requête est en cours
        state.error = null; // Réinitialise les erreurs précédentes
      })

      /**
       * Gère l'état fulfilled du thunk fetchUserProfile.
       * 
       * @param {Object} state - L'état actuel du slice.
       * @param {Object} action - L'action contenant les données de réponse de l'API.
       */
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false; // Indique que la requête est terminée
        state.profile = action.payload.body; // Met à jour les données du profil avec la réponse de l'API
      })

      /**
       * Gère l'état rejected du thunk fetchUserProfile.
       * 
       * @param {Object} state - L'état actuel du slice.
       * @param {Object} action - L'action contenant les données d'erreur.
       */
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false; // Indique que la requête est terminée
        state.error = action.payload; // Stocke les données d'erreur
      })

      /**
       * Gère l'état pending du thunk updateUserProfile.
       * 
       * @param {Object} state - L'état actuel du slice.
       */
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true; // Indique que la requête est en cours
        state.error = null; // Réinitialise les erreurs précédentes
      })

      /**
       * Gère l'état fulfilled du thunk updateUserProfile.
       * 
       * @param {Object} state - L'état actuel du slice.
       * @param {Object} action - L'action contenant les données de réponse de l'API.
       */
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false; // Indique que la requête est terminée
        state.profile = action.payload.body; // Met à jour les données du profil avec la réponse de l'API
      })

      /**
       * Gère l'état rejected du thunk updateUserProfile.
       * 
       * @param {Object} state - L'état actuel du slice.
       * @param {Object} action - L'action contenant les données d'erreur.
       */
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false; // Indique que la requête est terminée
        state.error = action.payload; // Stocke les données d'erreur
      });
  },
});

// Exporte l'action resetProfile
export const { resetProfile } = profileSlice.actions;

// Exporte le reducer du slice profil pour l'intégrer dans le store Redux
export default profileSlice.reducer;
