import { FaChevronUp } from "react-icons/fa";
function TopBtn() {
  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="btnWrap">
      <button className="topBtn" onClick={handleTop}>
        <FaChevronUp size={20} />
      </button>
    </div>
  );
}
export default TopBtn;
