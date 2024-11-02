import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

export default function MeusFilmes() {
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [watchLaterMovies, setWatchLaterMovies] = useState([]);

    // Carrega os filmes do LocalStorage ao montar o componente
    useEffect(() => {
        const storedWatchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        const storedWatchLaterMovies = JSON.parse(localStorage.getItem('watchLaterMovies')) || [];
        setWatchedMovies(storedWatchedMovies);
        setWatchLaterMovies(storedWatchLaterMovies);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Meus Filmes</h2>

            <section className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Filmes Assistidos</h3>
                {watchedMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {watchedMovies.map(movie => (
                            <MovieCard key={movie.id} {...movie} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Você ainda não assistiu a nenhum filme.</p>
                )}
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-3">Filmes para Ver Depois</h3>
                {watchLaterMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {watchLaterMovies.map(movie => (
                            <MovieCard key={movie.id} {...movie} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Você ainda não tem filmes para ver depois.</p>
                )}
            </section>
        </div>
    );
}
