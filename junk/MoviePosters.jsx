import { useState } from "react";
import Popup from "./Popup";
import TestPopup from "./TestPopup";
function MoviePosters({ movieData, addHistoryData }) {
  const [selectMovie, setSelectMovie] = useState(null);
  const handleClickData = (movie) => {
    setSelectMovie(movie);
  };
  return (
    <div className="MoviePosters">
      <div className="movieNow">
        <h2>현재 상영중인 영화</h2>
      </div>
      <div className="posterBoxWrap">
        {movieData.map((movie, i) => {
          const backDropUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
          return (
            <div className="posterBox" key={i}>
              <div className="Poster">
                <img
                  src={backDropUrl}
                  alt="Backdrop"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleClickData(movie);
                    addHistoryData(movie);
                  }}
                />
              </div>
              <div className="titleAverage">
                <span>
                  {movie.title.length > 10
                    ? movie.title.slice(0, 10) + "..."
                    : movie.title}
                </span>
                <span>★ {parseFloat(movie.vote_average.toFixed(1))}</span>
              </div>
            </div>
          );
        })}
      </div>
      <TestPopup
        selectMovie={selectMovie}
        setSelectMovie={setSelectMovie}
      ></TestPopup>
    </div>
  );
}
export default MoviePosters;
