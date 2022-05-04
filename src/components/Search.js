import React, { useState } from "react";
import { ResultCard } from "./ResultCard";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const moviesFunction = (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = axios
        .get(
          `https://imdb-api.com/en/API/SearchMovie/${process.env.REACT_APP_IMDB_KEY}/${query}`
        )
        .then((res) => {
          console.log(res);
          if (!data.errorMessage) {
            setLoading(false);
            setResults(res.data.results);
          } else {
            setResults([]);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  return (
    <div id="Search">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <form onSubmit={moviesFunction}>
              <input
                type="text"
                placeholder="Search for a movie"
                value={query}
                onChange={onChange}
                required
              />
            </form>
            {loading ? (<div className="spinner round"></div>
            ) : (
              results.length > 0 && (
              <ul className="results">
            {results.map((movie) => (
              <li key={movie.id}>
              <ResultCard movie={movie} />
              </li>
              ))}
              </ul>
              ))}
          </div>
          {}
        </div>
      </div>
    </div>
  );
};

export default Search;
