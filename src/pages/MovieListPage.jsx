// import { useState } from "react"

import { useState } from "react"
import movies from "../data/movies.json"
import MovieCard from "../components/MovieCard"

// export default function MovieListPage(){

//     const [contador, setContador] = useState(0)
//     const [text, setTex] = useState("ola")

//     const handleClick = () =>{
//         setContador((prev) => prev + 1)
//         console.log(contador)
//     }
//     const handleClick2 = () =>{
//         setContador((prev) => prev - 1)
//         console.log(contador)
//     }

//     const handleClick3 = () =>{
//         setContador(0)
//         console.log(contador)
//     }

//     const handleClick4 = () =>{
//         setTex(prev => prev === "ola" ? "trocou" : "ola")
//     }


//     return(
//         <>
//             <p>{Math.random()}</p>
//             <p> {contador}</p>
//             <button onClick={handleClick}>Aumentar</button>
//             <br />
//             <button onClick={handleClick2}>Dimunuir</button>
//             <br />
//             <button onClick={handleClick3}>Zerar</button>
//             <br />
//             <button onClick={handleClick4}>{text}</button>
//         </>
//     )
// }

export default function MovieListPage(){

    const [search, setSearch] = useState("")

    const handleSearch = (event) =>{
        setSearch(event.target.value)
    }

    const filmesFiltrados = movies.filter(filme => filme.titulo.toLowerCase().includes(search.toLowerCase()))

    return(
        <>
            <h2>veja o catálogo de filmes complestos</h2>
            <input
            className="text-black"
            type="text"
            id="search"
            value={search}
            onChange={handleSearch}
            />
            <section className="flex gap-10">
            {
                    filmesFiltrados.length > 0 ? 
                    filmesFiltrados
                    .map(filme =>(
                        <MovieCard key={filme.id} {...filme}/>
                    ))
                    :
                    <p>Filme não encontrado</p>
                }
            </section>
        </>
    )
}