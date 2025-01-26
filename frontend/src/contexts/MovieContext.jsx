
import { createContext, useState, useContext, useEffect} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if(storedFavs){
            setFavorites(JSON.parse(storedFavs));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))}, [favorites]
    );

    const addToFavorites = (movie) => {
        setFavorites((prevFavorites) => [...prevFavorites, movie]);
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(favorites.filter((movie) => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}