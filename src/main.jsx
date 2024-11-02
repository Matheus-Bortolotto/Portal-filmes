import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import MoviesByGenrePage from './pages/MoviesByGenrePage.jsx';
import MovieListPage from './pages/MovieListPage.jsx';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import Home from './pages/Home.jsx';
import GenreList from './pages/GenreListPage.jsx';
import PageNotFound from './pages/PagesNotFound.jsx';
import Favorites from './pages/Favorites.jsx';
import Contato from './pages/Contato.jsx';
import MeusFilmes from "./pages/MeusFilmes.jsx";


import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { WatchedProvider } from './context/WatchedContext.jsx';
import { WatchLaterProvider } from './context/WatchLaterContext.jsx';
import { ThemeProvider } from "@material-tailwind/react";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/movies', element: <MovieListPage /> },
      { path: '/movies/:id', element: <MovieDetailPage /> },
      { path: '/genre', element: <GenreList /> },
      { path: '/genre/:genero', element: <MoviesByGenrePage /> },
      { path: '/favoritos', element: <Favorites /> },
      { path: '/contato', element: <Contato /> },
      { path: '/meus-filmes', element: <MeusFilmes /> },
      { path: '*', element: <PageNotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <WatchedProvider>
          <WatchLaterProvider>
            <RouterProvider router={router} />
          </WatchLaterProvider>
        </WatchedProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </StrictMode>
);
