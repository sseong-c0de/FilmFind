import SerchInput from "./SerchInput";
import LinkBar from "./LinkBar";
function MainBanner({
  movieData,
  tvData,
  trendData,
  setSelectCategory,
  addHistoryData,
  historyData,
}) {
  return (
    <div className="MainBanner">
      <SerchInput
        movieData={movieData}
        tvData={tvData}
        trendData={trendData}
        addHistoryData={addHistoryData}
        historyData={historyData}
      ></SerchInput>
      <LinkBar setSelectCategory={setSelectCategory}></LinkBar>
    </div>
  );
}
export default MainBanner;
