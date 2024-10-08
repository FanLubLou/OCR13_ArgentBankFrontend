import { apiUrl } from "../../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action asynchrone pour connecter l'utilisateur via l'API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, userData);
      const token = response.data.body.token;
      return { ...response.data, token };
    } catch (error) {
      console.log("API error:", error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  remember: false, // Variable pour savoir si on doit utiliser localStorage
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.remember = false; // Réinitialiser remember lors de la déconnexion
    },
    setRememberMe: (state, action) => {
      state.remember = action.payload; // Met à jour la variable remember
    },
    resetError: (state) => { // Action pour réinitialiser l'erreur
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Stocke les infos utilisateur
        state.token = action.payload.token; // Stocke le token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Stocke l'erreur
      });
  },
});

// Export des actions
export const { logout, setRememberMe, resetError } = authSlice.actions;
export default authSlice.reducer;
