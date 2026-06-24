import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TodoProvider from './components/Context.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <TodoProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </TodoProvider>
)
