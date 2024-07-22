import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

/** Shape of the login state */
interface LoginState {
  statusLogin: boolean;
  token: string | null;
}

/** Shape of the user state */
interface UserState {
  email: string | null;
  firstName: string | null;
  lastName: null;
  createdAt: string | null;
  updatedAt: string | null;
  id: string | null;
}
const initialStateLogin:LoginState  = { statusLogin: false, token: null }
/** Slice for managing login state */
const loginSlice = createSlice({
  name: 'login',
  initialState: initialStateLogin,
  reducers: {
    /**
     * Updates the login state
     * @param state - The current login state
     * @param action - The action containing the new login state
     * @returns The updated login state
     */
    signInReducer: (state, action: PayloadAction<LoginState>) => {
      return { ...state, ...action.payload };
    },
    signOutReducer: () => {
      return initialStateLogin;
    },
  },
});

const initialStateUser: UserState = {
  email: null,
  firstName: null,
  lastName: null,
  createdAt: null,
  updatedAt: null,
  id: null,
}
/** Slice for managing user data */
const userSlice = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {
    /**
     * Updates the user data
     * @param state - The current user state
     * @param action - The action containing the new user data
     * @returns The updated user state
     */
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      return initialStateUser;
    },
  },
});

/** Action creators for login and user data */
export const { signInReducer, signOutReducer } = loginSlice.actions;
export const { setUserData, resetUser } = userSlice.actions;

/** Configured Redux store */
export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    user: userSlice.reducer,
  },
});

/** Type representing the entire Redux store state */
export type RootState = ReturnType<typeof store.getState>;

/** Type representing the dispatch function */
export type AppDispatch = typeof store.dispatch;