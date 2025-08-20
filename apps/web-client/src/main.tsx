import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ProviderComposer, AppRouterProvider } from '@/application/providers';

import './index.css';

const PROVIDERS = [
  StrictMode,
  AppRouterProvider,
];

createRoot(document.getElementById('root')!).render(
  <ProviderComposer providers={PROVIDERS} />,
);