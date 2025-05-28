import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

function Popup({ selectItem, setSelectItem }) {
  if (!selectItem) return null;

  const { poster_path, title, name, overview, vote_average } = selectItem;
  const imageUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
  const [openPopup, setOpenPopup] = useState(true);

  useEffect(() => {
    document.body.classList.add("fixed");
    return () => {
      document.body.classList.remove("fixed");
    };
  }, []);
  useEffect(() => {
    const keyDownClose = (e) => {
      if (e.key === "Escape") {
        setSelectItem(null);
      }
    };
    window.addEventListener("keydown", keyDownClose);
    return () => {
      window.removeEventListener("keydown", keyDownClose);
    };
  }, []);
  const close = () => {
    setSelectItem(null);
  };
  return ReactDOM.createPortal(
    <div className="popupWrap">
      <div className="popupModal">
        <div className="popupPosterBox">
          <img
            src={imageUrl}
            alt={title || name || "자료 없음"}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="popupRight">
          <div className="popupPlotBox">
            <button className="popup_close" onClick={close}>
              X
            </button>
            <div className="plotTitleP">
              <div className="plotTitle">
                <h3>{title || name || "이미지 없음"}</h3>
              </div>
              <div className="Plots">
                <p>{overview || "준비된 내용이 없습니다"}</p>
              </div>
            </div>
          </div>
          <div className="popupEtcBox">
            <div className="etcBar">
              <span>
                평점:{" "}
                {vote_average
                  ? parseFloat(vote_average.toFixed(1))
                  : "평점 없음"}
              </span>
              <Link to="#">출연 및 감독</Link>
              <Link to="#">트레일러</Link>
              <Link to="#">자세히 보기</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="clear"></div>
    </div>,
    document.body
  );
}

export default Popup;
