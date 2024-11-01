// src/components/RecommendedCarousel.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RecommendedCarousel() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const watchedMovies = JSON.parse(localStorage.getItem("watchedMovies")) || [];
    const watchLaterMovies = JSON.parse(localStorage.getItem("watchLaterMovies")) || [];

    // Combine e remova duplicatas
    const allMovies = [...watchedMovies, ...watchLaterMovies];
    const uniqueMovies = Array.from(new Set(allMovies.map(movie => movie.id)))
      .map(id => allMovies.find(movie => movie.id === id));

    setRecommendedMovies(uniqueMovies);
  }, []);

  // Funções para navegação no carrossel
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? recommendedMovies.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === recommendedMovies.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="recommended-carousel my-8">
      <h2 className="text-2xl font-bold text-center mb-4">Recomendados para Você</h2>
      <div className="relative w-full max-w-2xl mx-auto">
        {recommendedMovies.length > 0 ? (
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${recommendedMovies.length * 100}%`,
              }}
            >
              {recommendedMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  className="flex-shrink-0 w-full"
                  style={{ width: '100%' }}
                >
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-lg w-full"
                    />
                    <h3 className="text-lg text-center mt-2">{movie.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
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
