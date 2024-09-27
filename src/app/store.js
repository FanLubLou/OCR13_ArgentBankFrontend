import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";

/**
 * Configuration de la persistance pour le store Redux.
 * @type {Object}
 * @property {string} key - La clé de base pour le stockage persistant.
 * @property {Object} storage - Le type de stockage utilisé (localStorage).
 * @property {Array<string>} whitelist - Liste des réducteurs à persister.
 */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

/**
 * Réducteur persisté pour l'authentification.
 * @type {Function}
 */
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

/**
 * Configuration et création du store Redux.
 * @type {Object}
 * @property {Object} reducer - Les réducteurs combinés du store.
 * @property {Function} middleware - Middleware personnalisé pour le store.
 */
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }),
});

/**
 * Création du persistor pour gérer la persistance du store.
 * @type {Object}
 */
export const persistor = persistStore(store);
