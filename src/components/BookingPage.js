import { useParams } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import "./BookingPage.css";

const BookingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  const [error, setError] = useState(null);
  let { mov_id } = useParams();
  useEffect(() => {
    const url = "https://localhost:44326/movie/" + mov_id;
    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setItems(data);
          console.log(items);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <div>
      <div className="row bannerrow">
        <div className="column moviebanner">
          <img className="banner" src={items.poster} alt="Avatar" style={{}} />
        </div>

        <div
          className="column moviebannerdetails"
          style={{
            backgroundImage: "url(" + items.poster + ")",
          }}
        >
          <div className="moviedetails">
            <div>
              {items.listingType == "NOW_SHOWING" && <h2>Now Showing</h2>}
              {items.listingType == "UP_COMING" && <h2>Coming Soon</h2>}
              <h1>{items.title}</h1>
              <h2>IMDB Rating - {items.imdbRating}</h2>
              <span>{items.location}</span>
              <span>{items.language}</span>
              <h1></h1>
              <br />
              <button>Book Tickets</button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="column aboutmovie">
          <h2>About the Movie</h2>
          <p>{items.plot}</p>
        </div>
      </div>
      <div className="row">
        <div className="column aboutmovie">
          <h2>Stills From the Show</h2>
          <div className="stills">
            {items.stills &&
              items.stills.map((still) => (
                <img className="banner" src={still} alt="Avatar" style={{}} />
              ))}
          </div>
        </div>

        <br />
      </div>
    </div>
  );
};

export default BookingPage;
