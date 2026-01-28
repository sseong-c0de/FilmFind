import { useEffect, useState } from "react";
import "../css/mobile.css";
import "../css/tablet.css";
import "../css/laptop.css";
import "../css/desktop.css";

// import "./App.css";

import Header from "./components/Header";
import MainBanner from "./components/MainBanner";
import axios from "axios";
import Posters from "./components/Poster";
import TopBtn from "./components/TopBtn";

function App() {
  const [movieData, setMovieData] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [selectCategory, setSelectCategory] = useState("movie");
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBtn(window.scrollY >= 160);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = async (url, setData) => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const join = url.includes("?") ? "&" : "?";
    const finalUrl = `${url}${join}api_key=${apiKey}`;

    try {
      const response = await axios.get(finalUrl, {
        headers: { accept: "application/json" },
      });
      setData(response.data.results);
    } catch (error) {
      console.error(`데이터 가져오기 실패: ${finalUrl}`, error);
    }
  };
  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1&region=KR",
      setMovieData
    );
    fetchData(
      "https://api.themoviedb.org/3/trending/tv/day?language=ko-KR",
      setTvData
    );
    fetchData(
      "https://api.themoviedb.org/3/trending/all/day?language=ko-KR",
      setTrendData
    );
  }, []);

  return (
    <div>
      <Header />
      <MainBanner
        movieData={movieData}
        setSelectCategory={setSelectCategory}
        tvData={tvData}
        trendData={trendData}
      />
      {/* 카테고리에 맞는 Posters 컴포넌트 호출 */}
      {selectCategory === "movie" && (
        <Posters data={movieData} dataType="movie" />
      )}
      {selectCategory === "tv" && <Posters data={tvData} dataType="tv" />}
      {selectCategory === "trend" && (
        <Posters data={trendData} dataType="trend" />
      )}
      {selectCategory === "more" && <Posters dataType="history" />}
      {showBtn && <TopBtn />}
    </div>
  );
}

export default App;
