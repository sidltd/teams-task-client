import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProviders from './providers/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
)
