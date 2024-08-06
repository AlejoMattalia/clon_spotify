// components/ClientOnlyProvider.tsx (o .js si no usas TypeScript)
'use client'; // Esto asegura que el código se ejecute en el lado del cliente

import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import {theme} from './theme'; // Ajusta la ruta si es necesario
import React from 'react';

interface ClientOnlyThemeProviderProps {
  children: React.ReactNode; // Define el tipo para children
}

const ClientOnlyThemeProvider: React.FC<ClientOnlyThemeProviderProps> = ({ children }) => {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ClientOnlyThemeProvider;
