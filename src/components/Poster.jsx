import { useState, useEffect } from "react";
import Popup from "./Popup";

function Posters({ data, dataType }) {
  const [selectItem, setSelectItem] = useState(null);
  const [localData, setLocalData] = useState([]);
  const [centerMode, setCenterMode] = useState(false);
  useEffect(() => {
    const windowSize = window.innerWidth;
    const dataLength = localData.length;
    if (
      dataType === "history" &&
      windowSize >= 1024 &&
      [2, 3, 6, 7].includes(dataLength)
    ) {
      setCenterMode(true);
    } else {
      setCenterMode(false);
    }
  }, [localData]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("historyData")) || [];
    setLocalData(storedData);
  }, [selectItem]);

  function addLocalData(newData) {
    setLocalData((prevData) => {
      const hasData = prevData.some((item) => item.id === newData.id);
      if (hasData) {
        return prevData;
      }
      const updatedData = [newData, ...prevData];
      const limitedData = updatedData.slice(0, 8);
      localStorage.setItem("historyData", JSON.stringify(limitedData));
      return limitedData;
    });
  }

  const handleClickData = (item) => {
    setSelectItem(item); // 팝업 띄울 때
    addLocalData(item); // 새 데이터를 로컬스토리지에 추가
  };

  // 로컬스토리지 데이터 초기화
  const dataClear = () => {
    localStorage.setItem("historyData", JSON.stringify([])); // 로컬스토리지 비우기
    setLocalData([]); // 상태 초기화
  };

  return (
    <div className="MoviePosters">
      <div className="movieNow">
        <h2>
          {dataType === "tv" && "TV 프로그램"}
          {dataType === "trend" && "인기 프로그램"}
          {dataType === "movie" && "현재 상영중인 영화"}
          {dataType === "history" && "최근 검색목록"}
        </h2>
        {dataType === "history" && (
          <button onClick={dataClear}>검색 목록 초기화</button>
        )}
      </div>

      <div className={`posterBoxWrap${centerMode ? " centerPoster" : ""}`}>
        {(dataType === "history" ? localData : data).map((item, i) => {
          const backDropUrl = `https://image.tmdb.org/t/p/original${item.poster_path}`;
          const title = item.title || item.name;
          return (
            <div className="posterBox" key={i}>
              <div className="Poster">
                <img
                  src={backDropUrl}
                  alt="Backdrop"
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => handleClickData(item)} // 클릭 시 addLocalData 호출
                />
              </div>
              <div className="titleAverage">
                <span>
                  {title.length > 10 ? title.slice(0, 10) + "..." : title}
                </span>
                <span>★ {parseFloat(item.vote_average.toFixed(1))}</span>
              </div>
            </div>
          );
        })}
      </div>

      {selectItem && (
        <Popup
          selectItem={selectItem} // selectItem을 TestPopup에 전달
          setSelectItem={setSelectItem} // close 기능을 위한 setSelectItem 전달
          dataType={dataType}
        />
      )}
    </div>
  );
}

export default Posters;
