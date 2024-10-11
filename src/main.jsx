import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieListPage from './pages/MovieListPage.jsx'
import MoviesByGenrePage from './pages/MoviesByGenrePage.jsx'
import GenreListPage from './pages/GenreListPage.jsx'
import MovieDetailPage from './pages/MovieDetailPage.jsx'
import PagesNotFound from './pages/PagesNotFound.jsx'
import Contato from './pages/Contato.jsx'

const router = createBrowserRouter([{
  path:'/',
  element: <App/>,
  children: [
      {index:true, element: <Home/>},
      {path:'filmes', element: <MovieListPage/>},
      {path: 'filmes/:id', element:<MovieDetailPage/>},
      {path:'generos', element:<GenreListPage/>},
      {path: 'generos/:id', element:<MoviesByGenrePage/>},
      { path: '/contato', element: <Contato /> },
      {path: '*', element: <PagesNotFound/>}
    ]   
}
])


  createRoot(document.getElementById('root')).render(
    <StrictMode>
    <RouterProvider router={router}/>
    </StrictMode>,
   )
   