import { useState, useEffect } from "react";
import TestPopup from "./TestPopup";

function MorePosters({ historyData, setHistoryData }) {
  const [selectMore, setSelectMore] = useState(null);
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("historyData")) || [];
    setLocalData(storedData);
  }, []);

  const handleClickData = (more) => {
    setSelectMore(more);
  };

  function dataClear() {
    setHistoryData([]);
    setLocalData([]);
    localStorage.removeItem("historyData");
  }

  return (
    <div className="MoviePosters">
      <div className="movieNow">
        <h2>최근 검색목록</h2>
        <button onClick={dataClear}>검색 목록 초기화</button>
      </div>
      <div className="posterBoxWrap">
        {localData.length > 0 ? (
          localData.map((data, i) => {
            const backDropUrl = `https://image.tmdb.org/t/p/original${data.poster_path}`;
            return (
              <div className="posterBox" key={i}>
                <div className="Poster">
                  <img
                    src={backDropUrl}
                    alt="Backdrop"
                    style={{ width: "100%", height: "100%" }}
                    onClick={() => handleClickData(data)}
                  />
                </div>
                <div className="titleAverage">
                  <span>
                    {(data.title?.length > 10
                      ? data.title.slice(0, 10) + "..."
                      : data.title) ||
                      (data.name?.length > 10
                        ? data.name.slice(0, 10) + "..."
                        : data.name)}
                  </span>
                  <span>★ {data.vote_average.toFixed(1)}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p>저장된 데이터가 없습니다.</p>
        )}
      </div>
      {selectMore && (
        <TestPopup selectMore={selectMore} setSelectMore={setSelectMore} />
      )}
    </div>
  );
}

export default MorePosters;
