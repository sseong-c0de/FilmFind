import { useState } from "react";
import TvPopup from "./TvPopup";
import TestPopup from "./TestPopup";
function TvPosters({ tvData, addHistoryData }) {
  const [selectTv, setSelectTv] = useState(null);
  const handleClickData = (tv) => {
    setSelectTv(tv);
  };
  return (
    <div className="MoviePosters">
      <div className="movieNow">
        <h2>TV 프로그램</h2>
      </div>
      <div className="posterBoxWrap">
        {tvData.map((tv, i) => {
          const backDropUrl = `https://image.tmdb.org/t/p/original${tv.poster_path}`;
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
                    handleClickData(tv);
                    addHistoryData(tv);
                  }}
                />
              </div>
              <div className="titleAverage">
                <span>
                  {tv.name.length > 10 ? tv.name.slice(0, 10) + "..." : tv.name}
                </span>
                <span>★ {parseFloat(tv.vote_average.toFixed(1))}</span>
              </div>
            </div>
          );
        })}
      </div>
      <TestPopup selectTv={selectTv} setSelectTv={setSelectTv}></TestPopup>
    </div>
  );
}
export default TvPosters;
