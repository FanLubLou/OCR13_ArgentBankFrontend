import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";


// Combiner tous les reducers dans un seul objet
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

/**
 * Configuration de la persistance pour le store Redux.
 * @type {Object}
 * @property {string} key - La clé de base pour le stockage persistant.
 * @property {Object} storage - Le type de stockage utilisé (sessionStorage).
 * @property {Array<string>} whitelist - Liste des réducteurs à persister.
 */
const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["auth", "profile"],
};

/**
 * Réducteur persisté pour l'authentification.
 * @type {Function}
 */
// Envelopper le rootReducer avec persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configuration et création du store Redux.
 * @type {Object}
 * @property {Object} reducer - Les réducteurs combinés du store.
 * @property {Function} middleware - Middleware personnalisé pour le store.
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});


/**
 * Création du persistor pour gérer la persistance du store.
 * @type {Object}
 */
export const persistor = persistStore(store);