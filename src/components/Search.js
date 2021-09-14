import React, { useState, useEffect } from "react";
import "./Search.css";
import icon from "../icons/fav-icon.png";

const Search = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsMaster, setItemsMaster] = useState([]);
  const [applyFilterText, setApplyFilterText] = useState("Apply Filters");
  const [filterBool, setFilterBool] = useState(false);

  const [upcoming, setUpcoming] = useState([]);
  const [upcomingMaster, setUpcomingMaster] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState([]);
  const [searchMaster, setSearchMaster] = useState([]);
  const [searched, setSearched] = useState(false);
  const [sortby, setSortBy] = useState("Sort by IMDB Rating");

  const baseurl = "https://localhost:44326/";
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterLanguage, setFilterLanguage] = useState("All");

  useEffect(() => {
    fetch("https://localhost:44326/running")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setItemsMaster(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    fetch("https://localhost:44326/upcoming")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUpcoming(result);
          setUpcomingMaster(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const SearchMovies = (e) => {
    if (searchQuery != "") {
      setSearched(true);
      fetch("https://localhost:44326/searchtitle?query=" + searchQuery)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setSearch(result);
            setSearchMaster(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } else {
      setSearch([]);
      setSearched(false);
    }
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    setSearch(search.sort((a, b) => (a.val > b.val ? 1 : -1)));
    setItems(items.sort((a, b) => (a.val > b.val ? 1 : -1)));
    setUpcoming(upcoming.sort((a, b) => (a.val > b.val ? 1 : -1)));
  };

  const applyFilterFunction = (e) => {
    e.preventDefault();
    if (filterBool) {
      setItems(itemsMaster);
      setUpcoming(upcomingMaster);
      setSearch(searchMaster);
    } else if (filterLanguage === "All" && filterLocation === "All") {
      setItems(itemsMaster);
      setUpcoming(upcomingMaster);
      setSearch(searchMaster);
    } else {
      setItems(itemsMaster);
      setUpcoming(upcomingMaster);
      setSearch(searchMaster);
      setSearch(
        search.filter(function (el) {
          if (filterLanguage !== "All" && filterLocation === "All") {
            return el.language.toUpperCase() == filterLanguage.toUpperCase();
          } else if (filterLocation !== "All" && filterLanguage === "All") {
            return el.location.toUpperCase() == filterLocation.toUpperCase();
          } else {
            return (
              el.language.toUpperCase() == filterLanguage.toUpperCase() &&
              el.location.toUpperCase() == filterLocation.toUpperCase()
            );
          }
        })
      );

      setItems(
        items.filter(function (el) {
          if (filterLanguage !== "All" && filterLocation === "All") {
            return el.language.toUpperCase() == filterLanguage.toUpperCase();
          } else if (filterLocation !== "All" && filterLanguage === "All") {
            return el.location.toUpperCase() == filterLocation.toUpperCase();
          } else {
            return (
              el.language.toUpperCase() == filterLanguage.toUpperCase() &&
              el.location.toUpperCase() == filterLocation.toUpperCase()
            );
          }
        })
      );

      setUpcoming(
        upcoming.filter(function (el) {
          if (filterLanguage !== "All" && filterLocation === "All") {
            return el.language.toUpperCase() == filterLanguage.toUpperCase();
          } else if (filterLocation !== "All" && filterLanguage === "All") {
            return el.location.toUpperCase() == filterLocation.toUpperCase();
          } else {
            return (
              el.language.toUpperCase() == filterLanguage.toUpperCase() &&
              el.location.toUpperCase() == filterLocation.toUpperCase()
            );
          }
        })
      );
    }
    setFilterBool(!filterBool);
  };

  return (
    <div>
      <div className="row">
        <div className="column searchcontrol" style={{}}>
          <form onSubmit={(e) => e.preventDefault()} className="searchform">
            <h3 htmlFor="">Search Title </h3>
            <input
              type="text"
              placeholder="The Departed"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={(e) => SearchMovies(e)}
            />
            <br />
            <div className="centerfilters"></div>

            <button
              style={{ marginRight: "-1px" }}
              onClick={(e) => SearchMovies(e)}
              type="button"
            >
              Find Movies
            </button>
          </form>
          <br />
          <form onSubmit={(e) => e.preventDefault()} className="searchform">
            <h3 htmlFor="">Apply Filters </h3>
            <br />
            <label>Location</label>
            <select
              name="location"
              value={filterLocation}
              onBlur={() => setFilterBool(false)}
              onChange={(e) => setFilterLocation(e.target.value)}
              id="location"
            >
              <option value="All">All</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
            </select>
            <br />
            <label>Language</label>
            <select
              name="language"
              id="language"
              value={filterLanguage}
              onBlur={() => setFilterBool(false)}
              onChange={(e) => setFilterLanguage(e.target.value)}
            >
              <option value="All">All</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>

            {!filterBool && (
              <button
                style={{
                  marginRight: "-1px",
                  backgroundColor: "#FF6A00",
                  color: "#fff",
                }}
                onClick={(e) => applyFilterFunction(e)}
                type="button"
              >
                Apply Filter
              </button>
            )}
            {filterBool && (
              <button
                style={{
                  marginRight: "-1px",
                  backgroundColor: "#fff",
                  border: "2px dotted #FF6A00",
                  color: "#FF6A00",
                }}
                onClick={(e) => applyFilterFunction(e)}
                type="button"
              >
                Disable Filters
              </button>
            )}
          </form>

          <br />
          <form onSubmit={(e) => e.preventDefault()} className="searchform">
            <h3 htmlFor="">Sort </h3>
            <br />
            <select
              name="sort"
              id="sort"
              value={sortby}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="imdbRating">Sort by IMDB Rating</option>
              <option value="language">Sort by Language</option>
              <option value="title">Sort by Title</option>
              <option value="location">Sort by Location</option>
            </select>
          </form>
        </div>
        <div className="column searchresult">
          {searchQuery != "" && search.length > 0 && (
            <h1>Search Result for '{searchQuery}'</h1>
          )}

          {searched && search.length == 0 && (
            <h1>
              No movie found of title '{searchQuery}'
              <br />
              <br />
            </h1>
          )}

          <div className="container">
            {search.map((item) => (
              <div key={item.id}>
                <a href={"/book/" + item.id}>
                  <div className="card">
                    <img
                      className="cardimage"
                      src={item.poster}
                      alt="Avatar"
                      style={{}}
                    />
                    <h3 className="movietitle">{item.title}</h3>

                    <h3 style={{ marginLeft: "15px", fontWeight: "600" }}>
                      IMDB Rating : {item.imdbRating}
                    </h3>
                    <h3 className="cardlang">{item.language}</h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <h1>Now Running</h1>
          <div className="container">
            {items.map((item) => (
              <div key={item.id}>
                <a href={"/book/" + item.id}>
                  <div className="card">
                    <img
                      className="cardimage"
                      src={item.poster}
                      alt="Avatar"
                      style={{}}
                    />
                    <h3 className="movietitle">{item.title}</h3>

                    <h3 style={{ marginLeft: "15px", fontWeight: "600" }}>
                      IMDB Rating : {item.imdbRating}
                    </h3>
                    <h3 className="cardlang">{item.language}</h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <h1>Up Running</h1>
          <div className="container">
            {upcoming.map((item) => (
              <div key={item.id}>
                <a href={"/book/" + item.id}>
                  <div className="card">
                    <img
                      className="cardimage"
                      src={item.poster}
                      alt="Avatar"
                      style={{}}
                    />
                    <h3 className="movietitle">{item.title}</h3>

                    <h3 style={{ marginLeft: "15px", fontWeight: "600" }}>
                      IMDB Rating : {item.imdbRating}
                    </h3>
                    <h3 className="cardlang">{item.language}</h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
