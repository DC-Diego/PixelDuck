import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import App from './App.jsx'
import NewFile from './components/NewFile.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: 'PixelDuck/newFile',
    element: <NewFile />
  },
  {
    path: '/PixelDuck/projeto',
    element: <App />
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <RouterProvider router={router} />
  </StrictMode>,
)
