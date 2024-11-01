import { createContext, useState, useEffect } from "react";

export const WatchLaterContext = createContext();

export function WatchLaterProvider({ children }) {
    const [watchLaterMovies, setWatchLaterMovies] = useState([]);

    useEffect(() => {
        const storedWatchLater = JSON.parse(localStorage.getItem("watchLaterMovies")) || [];
        setWatchLaterMovies(storedWatchLater);
    }, []);

    const addWatchLater = (movie) => {
        const updatedWatchLater = [...watchLaterMovies, movie];
        setWatchLaterMovies(updatedWatchLater);
        localStorage.setItem("watchLaterMovies", JSON.stringify(updatedWatchLater));
    };

    return (
        <WatchLaterContext.Provider value={{ watchLaterMovies, addWatchLater }}>
            {children}
        </WatchLaterContext.Provider>
    );
}
