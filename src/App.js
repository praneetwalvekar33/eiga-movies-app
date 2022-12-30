import React,{ useEffect, useState } from 'react';

import './App.css';
import SearchIcon from './searchicon.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=eb681675';

const App = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    const handleEnterEvent = (event)=>{
        if(event.key==='Enter'){
            queryForMovies(searchTerm);
        }

    }

    const queryForMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        
        if(data.Response.localeCompare('True')===0){
            setMovies(data.Search);
        }else{
            setMovies([]);
        }
    }
    useEffect(() => {
        queryForMovies('Sher');
    }, []);

    return (
        <div className="app">
            <h1>
                Eiga
            </h1>

            <div className="search-bar">
                <input 
                    value={searchTerm}
                    placeholder="Search for movies"
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                    onKeyDown={handleEnterEvent}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={()=>{queryForMovies(searchTerm)}}
                />
            </div>

            {movies.length>0?(
                <div className="container">    
                    {movies.map((movie) => {
                       return( 
                       <MovieCard movie={movie}/>
                       )
                    })}
                </div>
            ):(
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
            }
        </div>
    );
}

export default App;