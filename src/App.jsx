import { useEffect, useState } from "react";
import "./App.css";

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
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDBkMjFiNGU4Y2VjNzdlODQxZTE2MGY1MGMyZjE5MyIsIm5iZiI6MTczNDMzNDY5Mi44Niwic3ViIjoiNjc1ZmQ4ZTRkNmY1ZTg0NThiOGI1Y2Q0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5w9FXyn85SyGTvXyj8PLpge2XR6c3jYUfYb-3lClZzI",
      },
    };
    try {
      const response = await axios.get(url, options);
      setData(response.data.results);
    } catch (error) {
      console.error(`데이터 가져오기 실패: ${url}`, error);
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
