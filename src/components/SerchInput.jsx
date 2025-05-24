import { useEffect, useState } from "react";
import Popup from "./Popup";
function SerchInput({ movieData, tvData, trendData }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectItem, setSelectItem] = useState(null);
  useEffect(() => {}, [selectItem]);
  function keyDownClose(e) {
    if (e.key === "Escape") {
      setSelectItem(null);
    }
  }

  function handleValue(e) {
    const value = e.target.value;
    setInputValue(value);
    const allData = [
      ...new Map(
        [...(movieData || []), ...(tvData || []), ...(trendData || [])].map(
          (item) => [item.id, item]
        )
      ).values(),
    ];

    if (value) {
      const filtered = allData.filter((item) => {
        const title = item.title?.toLowerCase() || "";
        const name = item.name?.toLowerCase() || "";
        return title.includes(value) || name.includes(value);
      });

      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
  }
  function clickList(movie) {
    let checkingData = JSON.parse(localStorage.getItem("historyData")) || [];
    const cateData = checkingData.some((item) => item.id === movie.id);
    if (!cateData) {
      checkingData = [movie, ...checkingData].slice(0, 8);
      localStorage.setItem("historyData", JSON.stringify(checkingData));
    }
    setSelectItem(movie);
  }
  function clickBtn() {
    if (filteredMovies.length > 0) {
      const firstMovie = filteredMovies[0];
      setSelectItem(firstMovie);
    }
  }
  function keyUpSerch(e) {
    if (e.key === "Enter" && filteredMovies.length > 0) {
      const firstMovie = filteredMovies[0];
      setSelectItem(firstMovie);
      clickList(firstMovie);
    }
  }
  return (
    <div className="SerchBox">
      <div className="inputList">
        <input
          className="SerchInput"
          placeholder="영화,TV프로그램 검색"
          value={inputValue}
          onChange={handleValue}
          onKeyUp={keyUpSerch}
          onKeyDown={keyDownClose}
        ></input>
        <button
          className="SerchBtn"
          onClick={() => {
            clickBtn();
          }}
        ></button>
        {filteredMovies.length > 0 && (
          <ul className="serchList">
            {filteredMovies.map((movie, index) => (
              <li
                key={index}
                className="serchItem"
                onClick={() => {
                  clickList(movie);
                }}
              >
                {movie.title || movie.name || "검색 결과 없음"}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectItem && (
        <Popup
          selectItem={selectItem}
          setSelectItem={setSelectItem}
          // addHistoryData={addHistoryData}
        ></Popup>
      )}
    </div>
  );
}
export default SerchInput;
