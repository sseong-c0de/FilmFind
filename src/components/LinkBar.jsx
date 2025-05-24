function LinkBar({ setSelectCategory }) {
  return (
    <div className="LinkBox">
      <div className="LinkBar">
        <button
          onClick={() => {
            setSelectCategory("movie");
          }}
        >
          영화
        </button>
        <button
          onClick={() => {
            setSelectCategory("tv");
          }}
        >
          TV
        </button>
        <button
          onClick={() => {
            setSelectCategory("trend");
          }}
        >
          인기 프로그램
        </button>
        <button
          onClick={() => {
            setSelectCategory("more");
          }}
        >
          다시보기
        </button>
        {/* <Link>영화</Link>
        <Link>TV</Link>
        <Link>인기 프로그램</Link>
        <Link>MORE</Link> */}
      </div>
    </div>
  );
}
export default LinkBar;
