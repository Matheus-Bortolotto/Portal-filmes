import { useContext, useEffect, useState } from "react";
import ContainerMovies from "../components/ContainerMovies";
import MovieCard from "../components/MovieCard";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Home() {
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [animationMovies, setAnimationMovies] = useState([]);
    const [scienceFictionMovies, setScienceFictionMovies] = useState([]);
    const [porVirMovies, setporVirMovies] = useState([]);
    const [maisVotadosMovies, setmaisVotadosMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const { favorites, handleFavorite, isFavorite } = useContext(FavoritesContext);

    const API_KEY = '?api_key=7c572a9f5b3ba776080330d23bb76e1e';
    const BASE_URL = 'https://api.themoviedb.org/3';

    const fetchRecommendedMovies = async (genreIds) => {
        try {
            const genreQuery = genreIds.join(',');
            const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreQuery}&language=pt-BR`);
            const data = await response.json();
            setRecommendedMovies(data.results);
        } catch (error) {
            console.error('Erro ao buscar recomendações:', error);
        }
    };

    const fetchMovies = async () => {
        try {
            const popularURL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-br&page=1`;
            const animationURL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-br&with_genres=16`;
            const scienceFictionURL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-br&with_genres=878`;
            const porVirMoviesURL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=pt-br&page=1`;
            const maisVotadosMoviesURL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=pt-br&page=1`;

            const [popularResponse, animationResponse, scienceFictionResponse, porVirMoviesResponse, maisVotadosMoviesResponse] = await Promise.all([
                fetch(popularURL),
                fetch(animationURL),
                fetch(scienceFictionURL),
                fetch(porVirMoviesURL),
                fetch(maisVotadosMoviesURL),
            ]);

            setPopularMovies((await popularResponse.json()).results);
            setAnimationMovies((await animationResponse.json()).results);
            setScienceFictionMovies((await scienceFictionResponse.json()).results);
            setporVirMovies((await porVirMoviesResponse.json()).results);
            setmaisVotadosMovies((await maisVotadosMoviesResponse.json()).results);
        } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchMovies();

        const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        const genres = new Set();
        watchedMovies.forEach(movie => movie.genre_ids?.forEach(id => genres.add(id)));
        fetchRecommendedMovies([...genres]);
    }, []);

    return (
        <>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    {/* Carrossel de Filmes Recomendados */}
                    <ContainerMovies titulo="Recomendados para Você">
                        <div className="flex overflow-x-scroll gap-4 p-4">
                            {recommendedMovies.length > 0 ? (
                                recommendedMovies.map(movie => (
                                    <div
                                        key={movie.id}
                                        className="flex-none w-64 bg-gray-800 p-2 rounded-md shadow-lg"
                                    >
                                        <MovieCard
                                            {...movie}
                                            handleFavorite={handleFavorite}
                                            isFavorite={isFavorite(movie)}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">Nenhuma recomendação disponível.</p>
                            )}
                        </div>
                    </ContainerMovies>

                    {/* Outras Seções de Filmes */}
                    <ContainerMovies titulo="Filmes Populares">
                        {popularMovies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                {...movie}
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite(movie)}
                            />
                        ))}
                    </ContainerMovies>
                    <ContainerMovies titulo="Animações">
                        {animationMovies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                {...movie}
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite(movie)}
                            />
                        ))}
                    </ContainerMovies>
                    <ContainerMovies titulo="Ficção Científica">
                        {scienceFictionMovies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                {...movie}
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite(movie)}
                            />
                        ))}
                    </ContainerMovies>
                    <ContainerMovies titulo="Filmes Por Vir">
                        {porVirMovies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                {...movie}
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite(movie)}
                            />
                        ))}
                    </ContainerMovies>
                    <ContainerMovies titulo="Filmes Mais Votados">
                        {maisVotadosMovies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                {...movie}
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite(movie)}
                            />
                        ))}
                    </ContainerMovies>
                </>
            )}
        </>
    );
}
