import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { VendasProvider } from './context/VendasContext';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Falha ao encontrar o elemento root no HTML.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <VendasProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </VendasProvider>
    </BrowserRouter>
  </React.StrictMode>
);
