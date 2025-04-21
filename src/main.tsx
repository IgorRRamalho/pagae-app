import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Twemoji from 'react-twemoji';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Twemoji options={{ className: 'twemoji' }}>
      <App />
    </Twemoji>
  </StrictMode>
);
