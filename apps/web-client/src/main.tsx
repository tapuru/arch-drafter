import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import '@bc-arch-drafter/ui/styles/global.css';
import '@bc-arch-drafter/ui';
import "./index.css"

import App from './application/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
