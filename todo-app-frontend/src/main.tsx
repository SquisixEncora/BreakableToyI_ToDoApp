import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToDoProvider } from './context/ToDoContext';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToDoProvider>
      <App />
    </ToDoProvider>
  </StrictMode>,
)
