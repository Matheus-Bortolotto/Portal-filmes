import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"

export default function MovieListPage() {

    const [search, setSearch] = useState("")
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`)
        .then(response => response.json())
        .then(data => setFilmes(data.results))
        .catch(error => console.error(error))
        .finally(() => console.log('fetch finalizado'));
      }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value)
        console.log(search)
    }

    const filmesFiltrados = filmes.filter(filme => filme.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <h2>Veja o catálogo completo de filmes</h2>
            <input
                className="text-black"
                type="text"
                id="search"
                value={search}
                onChange={handleSearch}
            />
            <section className="flex gap-8">
                {
                    filmes.map(filme => (
                        <div>
                        <h1>{filme.title}</h1>
                        <p>{filme.vote_average}</p>
                        <img src={`https://image.tmdb.org/t/p/w1280${filme.backdrop_path}`}></img>
                        <img src={`https://image.tmdb.org/t/p/w185${filme.poster_path}`}></img>
                        </div>
                    ))
                }
            </section>
        </>
    )
}