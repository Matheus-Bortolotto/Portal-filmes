import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RecommendedCarousel() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const watchedMovies = JSON.parse(localStorage.getItem("watchedMovies")) || [];
    const watchLaterMovies = JSON.parse(localStorage.getItem("watchLaterMovies")) || [];

    const allMovies = [...watchedMovies, ...watchLaterMovies];
    const uniqueMovies = Array.from(new Set(allMovies.map(movie => movie.id)))
      .map(id => allMovies.find(movie => movie.id === id));

    setRecommendedMovies(uniqueMovies);
  }, []);

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

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="recommended-carousel my-6">
      <h2 className="text-xl font-semibold text-center mb-4">Recomendados para Você</h2>
      <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-md shadow-md">
        {recommendedMovies.length > 0 ? (
          <div className="relative flex items-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full z-10 hover:bg-opacity-75 transition"
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
                  className="flex-shrink-0 w-full px-1"
                  style={{ width: '100%' }}
                >
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-md w-full shadow-sm"
                    />
                    <h3 className="text-base text-center mt-1 font-medium">{movie.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="absolute right-0 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full z-10 hover:bg-opacity-75 transition"
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
