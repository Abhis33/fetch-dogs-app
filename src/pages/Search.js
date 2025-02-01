import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, searchDogs, addFavorite, removeFavorite, fetchFavoriteDogs } from '../redux/slices/dogsSlice';
import "../styles/Search.scss";

const Search = () => {
  const dispatch = useDispatch();
  const { breeds, dogs, favorites, favoriteDetails } = useSelector((state) => state.dogs);

  // UI States
  const [selectedBreed, setSelectedBreed] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Results per page

  useEffect(() => {
    dispatch(getBreeds());
    handleSearch();
  }, [dispatch, sortOrder]);

  useEffect(() => {
    handleSearch();
  }, [sortOrder]);

  useEffect(() => {
    if (favorites.length > 0) {
      dispatch(fetchFavoriteDogs(favorites));
    }
  }, [dispatch, favorites]);

  const handleSearch = () => {
    dispatch(
      searchDogs({
        breeds: selectedBreed ? [selectedBreed] : [],
        size: pageSize,
        from: currentPage * pageSize,
        sort: `breed:${sortOrder}`, // Sorting by breed
      })
    );
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    handleSearch(); // Re-fetch with new sort order
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    handleSearch();
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <h2>Find Your Perfect Dog</h2>

      {/* Breed Filter */}
      <label htmlFor="breed-select">Filter by Breed:</label>
      <select id="breed-select" onChange={(e) => setSelectedBreed(e.target.value)}>
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      <label htmlFor="breed-sort-order">
        Current sorting order by Breed: {sortOrder === "asc" ? "Ascending" : "Descending"}
      </label>
      {/* Sorting Toggle */}
      <button className="sort-button" onClick={handleSortToggle}>
        Sort by Breed ({sortOrder === "asc" ? "Descending" : "Ascending"})
      </button>

      {/* Search Button */}
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      {/* Dogs List */}
      <div className="dogs-list">
        {dogs.map((dog) => (
          <div key={dog.id} className="dog-card">
            <img src={dog.img} alt={dog.name} />
            <h3>{dog.name}</h3>
            <p><strong>Breed:</strong> {dog.breed}</p>
            <p><strong>Age:</strong> {dog.age} years</p>
            <p><strong>Zip Code:</strong> {dog.zip_code}</p>
            <button onClick={() => dispatch(addFavorite(dog.id))}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>Page {currentPage + 1}</span>
        <button onClick={nextPage}>
          Next
        </button>
      </div>

      <h2>Your Favorite Dogs</h2>
      <div className="favorites-list">
        {favoriteDetails.map((dog) => (
          <div key={dog.id} className="dog-card">
            <img src={dog.img} alt={dog.name} />
            <h3>{dog.name}</h3>
            <p>
              <strong>Breed:</strong> {dog.breed}
            </p>
            <p>
              <strong>Age:</strong> {dog.age} years
            </p>
            <p>
              <strong>Zip Code:</strong> {dog.zip_code}
            </p>
            <button onClick={() => dispatch(removeFavorite(dog.id))}>
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
