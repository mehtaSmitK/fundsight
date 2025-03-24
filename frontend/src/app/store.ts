import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import investmentReducer from '../features/investmentSlice'; // Fixed import path
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    investments: investmentReducer,
    auth: authReducer,
    // ...other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
