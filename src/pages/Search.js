import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, searchDogs, addFavorite, removeFavorite, fetchFavoriteDogs, matchDog } from '../redux/slices/dogsSlice';
import "../styles/Search.scss";

const Search = () => {
  const dispatch = useDispatch();
  const { breeds, dogs, favorites, favoriteDetails, isLoading } = useSelector((state) => state.dogs);
  const { match } = useSelector((state) => state.dogs);

  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const pageSize = 12;

  useEffect(() => {
    dispatch(getBreeds());
    handleSearch();
  }, [dispatch]);

  useEffect(() => {
    handleSearch();
  }, [sortOrder, currentPage, selectedBreeds]);

  useEffect(() => {
    dispatch(fetchFavoriteDogs(favorites));
    if (favorites.length === 0 && showFavorites) {
      setShowFavorites(false);
    }
  }, [dispatch, favorites]);

  const handleSearch = () => {
    dispatch(
      searchDogs({
        breeds: selectedBreeds,
        size: pageSize,
        from: currentPage * pageSize,
        sort: `breed:${sortOrder}`,
      })
    );
  };

  const handleBreedChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedBreeds(selectedOptions);
    setCurrentPage(0);
  };

  const handleClearBreeds = () => {
    setSelectedBreeds([]);
    setCurrentPage(0);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCurrentPage(0);
  };

  const handleFavoriteToggle = (dogId) => {
    if (favorites.includes(dogId)) {
      dispatch(removeFavorite(dogId));
    } else {
      dispatch(addFavorite(dogId));
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleFindMatch = () => {
    if (favorites.length > 0) {
      dispatch(matchDog(favorites));
    }
  };

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-header">
          <h1>Find Your Perfect Dog</h1>
          <div className="view-toggle">
            <button 
              className={`button ${!showFavorites ? 'button--primary' : ''}`}
              onClick={() => setShowFavorites(false)}
            >
              Search Dogs
            </button>
            <button 
              className={`button ${showFavorites ? 'button--primary' : ''}`}
              onClick={() => setShowFavorites(true)}
            >
              Favorites ({favorites.length})
            </button>
          </div>
        </div>

        {!showFavorites ? (
          <>
            <div className="search-controls">
              <div className="breed-select-container">
                <select
                  className="breed-select input"
                  value={selectedBreeds}
                  onChange={handleBreedChange}
                  multiple
                  size={Math.min(5, breeds.length)}
                >
                  {breeds.map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
                {selectedBreeds.length > 0 && (
                  <div className="selected-breeds">
                    <div className="selected-breeds-list">
                      {selectedBreeds.map(breed => (
                        <span key={breed} className="breed-tag">
                          {breed}
                          <button
                            onClick={() => setSelectedBreeds(prev => prev.filter(b => b !== breed))}
                            className="remove-breed"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={handleClearBreeds}
                      className="clear-breeds"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              <button className="sort-button" onClick={handleSortToggle}>
                <span>Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {sortOrder === "asc" ? (
                    <path d="M3 16h7m-7-8h12m-5 12h10M8 4h13" />
                  ) : (
                    <path d="M3 8h13M3 16h7m5-12h10M8 20h13" />
                  )}
                </svg>
              </button>
            </div>

            {isLoading ? (
              <div className="loading">
                <div className="spinner" data-testid="loading-spinner" />
              </div>
            ) : dogs.length > 0 ? (
              <div className="dogs-grid">
                {dogs.map((dog) => (
                  <div key={dog.id} className="dog-card">
                    <img
                      src={dog.img}
                      alt={dog.breed}
                      className="dog-image"
                      loading="lazy"
                    />
                    <div className="dog-info">
                      <h3>{dog.breed}</h3>
                      <p>Age: {dog.age} years</p>
                      <p>Zip Code: {dog.zip_code}</p>
                    </div>
                    <div className="dog-actions">
                      <button
                        onClick={() => handleFavoriteToggle(dog.id)}
                        className={favorites.includes(dog.id) ? "favorite-active" : ""}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={favorites.includes(dog.id) ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>{favorites.includes(dog.id) ? "Favorited" : "Favorite"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No dogs found. Try adjusting your search criteria.</p>
              </div>
            )}

            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 0}>
                Previous
              </button>
              <button onClick={nextPage} disabled={dogs.length < pageSize}>
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="favorites-section">
            {favoriteDetails.length > 0 ? (
              <>
                <div className="favorites-header">
                  <h2>Your Favorite Dogs</h2>
                  <button className="button button--primary" onClick={handleFindMatch}>
                    Find Perfect Match
                  </button>
                </div>
                {match && (
                  <div className="match-result">
                    <div className="card">
                      <h3>Your Perfect Match!</h3>
                      <p>We found your perfect match: {match}</p>
                    </div>
                  </div>
                )}
                <div className="dogs-grid">
                  {favoriteDetails.map((dog) => (
                    <div key={dog.id} className="dog-card">
                      <img
                        src={dog.img}
                        alt={dog.breed}
                        className="dog-image"
                        loading="lazy"
                      />
                      <div className="dog-info">
                        <h3>{dog.breed}</h3>
                        <p>Age: {dog.age} years</p>
                        <p>Zip Code: {dog.zip_code}</p>
                      </div>
                      <div className="dog-actions">
                        <button
                          onClick={() => handleFavoriteToggle(dog.id)}
                          className="favorite-active"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                          <span>Remove from Favorites</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-results">
                <p>You haven't favorited any dogs yet. Start by adding some dogs to your favorites!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
