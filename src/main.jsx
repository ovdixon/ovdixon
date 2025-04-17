import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Scene from './components/scene'
import { Profile } from './routes'
import './index.css'

const router = createBrowserRouter([
    {
      Component: Scene,
      children: [
        { index: true, element: <Profile /> },
      ]

    }
  ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />

  </StrictMode>,
)
