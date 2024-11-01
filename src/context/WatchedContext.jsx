import { createContext, useState, useEffect } from "react";

export const WatchedContext = createContext();

export function WatchedProvider({ children }) {
    const [watchedMovies, setWatchedMovies] = useState([]);

    useEffect(() => {
        const storedWatched = JSON.parse(localStorage.getItem("watchedMovies")) || [];
        setWatchedMovies(storedWatched);
    }, []);

    const addWatched = (movie) => {
        const updatedWatched = [...watchedMovies, movie];
        setWatchedMovies(updatedWatched);
        localStorage.setItem("watchedMovies", JSON.stringify(updatedWatched));
    };

    return (
        <WatchedContext.Provider value={{ watchedMovies, addWatched }}>
            {children}
        </WatchedContext.Provider>
    );
}
