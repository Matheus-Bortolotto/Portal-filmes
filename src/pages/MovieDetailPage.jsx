import { useContext, useEffect, useState } from "react";
import { WatchedContext } from "../context/WatchedContext";
import { WatchLaterContext } from "../context/WatchLaterContext";
import { useParams } from "react-router-dom";
import { FaStar, FaCoins, FaEye, FaClock } from "react-icons/fa";

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [revenueInBRL, setRevenueInBRL] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [message, setMessage] = useState(null); // Estado para as mensagens de notificação

    const { addWatched } = useContext(WatchedContext);
    const { addWatchLater } = useContext(WatchLaterContext);

    const exchangeRate = 5;

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`);
                const data = await response.json();
                setMovie(data);
                setRevenueInBRL((data.revenue * exchangeRate).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
            } catch (err) {
                console.error("Error fetching movie:", err);
            }
        };
        fetchMovie();
    }, [id]);

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`);
                const data = await response.json();
                if (data.results.length > 0) {
                    setTrailer(`https://www.youtube.com/embed/${data.results[0].key}`);
                }
            } catch (err) {
                console.error("Error fetching trailer:", err);
            }
        };
        fetchTrailer();
    }, [id]);

    const handleAddWatched = () => {
        addWatched(movie);
        setMessage("O filme foi adicionado à sua lista de assistidos!");
        setTimeout(() => setMessage(null), 3000); // Remove a mensagem após 3 segundos
    };

    const handleAddWatchLater = () => {
        addWatchLater(movie);
        setMessage("O filme foi adicionado à sua lista de assistir depois!");
        setTimeout(() => setMessage(null), 3000); // Remove a mensagem após 3 segundos
    };

    if (!movie) return <p>Loading...</p>;

    return (
        <div 
            className="h-[800px] bg-cover bg-center text-white relative"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}>
            <div className="bg-black bg-opacity-70 p-10 w-full h-full absolute top-0 left-0 flex gap-x-10">
                <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={movie.title} />
                <div className="flex flex-col gap-y-3 justify-start items-center">
                    <h1 className="text-5xl font-bold text-center">{movie.title}</h1>
                    <p className="font-semibold text-lg text-center">{movie.overview || 'Descrição não disponível'}</p>
                    <div className="flex gap-10">
                        <div className="flex items-center gap-1 font-semibold text-md">
                            <FaStar className="text-yellow-600" /> <span>{movie.vote_average}</span>
                        </div>
                        <div className="flex items-center gap-2 font-semibold text-lg">
                            <FaCoins className="text-yellow-600" /> <span>{revenueInBRL || 'Valor não divulgado'}</span>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button onClick={handleAddWatched} className="bg-green-500 px-4 py-2 rounded text-white flex items-center gap-2 hover:scale-110">
                            <FaEye /> Assistido
                        </button>
                        <button onClick={handleAddWatchLater} className="bg-blue-500 px-4 py-2 rounded text-white flex items-center gap-2 hover:scale-110">
                            <FaClock /> Ver Depois
                        </button>
                    </div>
                    {message && (
                        <div className="bg-black text-red-800 p-4 mt-4 rounded shadow-lg">
                            {message}
                        </div>
                    )}
                    {trailer ? (
                        <iframe
                            width="560"
                            height="315"
                            src={trailer}
                            title={`${movie.title} Trailer`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <p>Trailer não disponível</p>
                    )}
                </div>
            </div>
        </div>
    );
}
