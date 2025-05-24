import { Link } from "react-router-dom";

function Popup({ selectMovie, setSelectMovie }) {
  if (!selectMovie) return null;
  const backDropUrl = `https://image.tmdb.org/t/p/original${selectMovie.poster_path}`;
  const close = () => {
    setSelectMovie(null);
  };
  return (
    <div className="popupWrap">
      <div className="popupModal">
        <div className="popupPosterBox">
          <img src={backDropUrl} alt={selectMovie.title}></img>
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
                <h3>{selectMovie.title}</h3>
              </div>
              <div className="Plots">
                <p>{selectMovie.overview}</p>
              </div>
            </div>
          </div>
          <div className="popupEtcBox">
            <div className="etcBar">
              <span>
                평점:{parseFloat(selectMovie.vote_average.toFixed(1))}
              </span>
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
export default Popup;
