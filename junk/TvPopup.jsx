import { Link } from "react-router-dom";

function TvPopup({ selectTv, setSelectTv }) {
  if (!selectTv) return null;
  const backDropUrl = `https://image.tmdb.org/t/p/original${selectTv.poster_path}`;
  const close = () => {
    setSelectTv(null);
  };
  return (
    <div className="popupWrap">
      <div className="popupModal">
        <div className="popupPosterBox">
          <img src={backDropUrl} alt={selectTv.name}></img>
        </div>
        <div className="popupRight">
          <div className="popupPlotBox">
            <button
              className="popup_close"
              onClick={() => {
                close();
              }}
            >
              X
            </button>
            <div className="plotTitleP">
              <div className="plotTitle">
                <h3>{selectTv.name}</h3>
              </div>
              <div className="Plots">
                <p>{selectTv.overview || "준비중입니다"}</p>
              </div>
            </div>
          </div>
          <div className="popupEtcBox">
            <div className="etcBar">
              <span>평점:{parseFloat(selectTv.vote_average.toFixed(1))}</span>
              <Link>출연 및 감독</Link>
              <Link>트레일러</Link>
              <Link>스틸컷</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="clear"></div>
    </div>
  );
}
export default TvPopup;
