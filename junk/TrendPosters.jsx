import { useState } from "react";
import Popup from "./Popup";
import TestPopup from "./TestPopup";
function TrendPosters({ trendData, addHistoryData }) {
  const [selectTrend, setSelectTrend] = useState(null);
  const handleClickData = (trend) => {
    setSelectTrend(trend);
  };
  return (
    <div className="MoviePosters">
      <div className="movieNow">
        <h2>인기 프로그램</h2>
      </div>
      <div className="posterBoxWrap">
        {trendData.map((trend, i) => {
          const backDropUrl = `https://image.tmdb.org/t/p/original${trend.poster_path}`;
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
                    handleClickData(trend);
                    addHistoryData(trend);
                  }}
                />
              </div>
              <div className="titleAverage">
                <span>
                  {trend.title
                    ? trend.title.length > 10
                      ? trend.title.slice(0, 10) + "..."
                      : trend.title
                    : trend.name.length > 10
                    ? trend.name.slice(0, 10) + "..."
                    : trend.name}
                </span>
                <span>★ {parseFloat(trend.vote_average.toFixed(1))}</span>
              </div>
            </div>
          );
        })}
      </div>
      <TestPopup
        data={trendData}
        selectTrend={selectTrend}
        setSelectTrend={setSelectTrend}
      ></TestPopup>
    </div>
  );
}
export default TrendPosters;
