import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RecommendedCarousel() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const watchedMovies = JSON.parse(localStorage.getItem("watchedMovies")) || [];
    const watchLaterMovies = JSON.parse(localStorage.getItem("watchLaterMovies")) || [];

    // Filtra filmes únicos com base no ID
    const allMovies = [...watchedMovies, ...watchLaterMovies];
    const uniqueMovies = Array.from(new Set(allMovies.map(movie => movie.id)))
      .map(id => allMovies.find(movie => movie.id === id));

    setRecommendedMovies(uniqueMovies);
  }, []);

  // Funções para os controles de navegação
  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? recommendedMovies.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === recommendedMovies.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Configuração para rotação automática
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); 
    return () => clearInterval(interval); 
  }, [currentIndex]);

  return (
    <div className="recommended-carousel my-8">
      <h2 className="text-2xl font-bold text-center mb-4">Recomendados para Você</h2>
      <div className="relative w-full max-w-xl mx-auto overflow-hidden rounded-lg shadow-lg">
        {recommendedMovies.length > 0 ? (
          <div className="relative flex items-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 bg-black bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-80 transition"
            >
              ❮
            </button>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${recommendedMovies.length * 100}%`,
              }}
            >
              {recommendedMovies.map(movie => (
                <div
                  key={movie.id}
                  className="flex-shrink-0 w-full px-2"
                  style={{ width: '100%' }}
                >
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-lg w-full shadow-md"
                    />
                    <h3 className="text-lg text-center mt-2 font-semibold">{movie.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="absolute right-0 bg-black bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-80 transition"
            >
              ❯
            </button>
          </div>
        ) : (
          <p className="text-center">Nenhum filme recomendado no momento.</p>
        )}
      </div>
    </div>
  );
}
