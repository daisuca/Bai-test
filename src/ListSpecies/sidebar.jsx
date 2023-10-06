import { LuSquareEqual } from "react-icons/lu";
import { RiDashboardFill } from "react-icons/ri";
import { FaUser, FaPencilAlt, FaBookmark } from "react-icons/fa";
import { PiSortAscendingLight } from "react-icons/pi";
import { GiSheep } from "react-icons/gi";
import "./sidebar.css";

function SideBar({ isHidden }) {
  const sidebarClassName = `sidebar mt-1 ${isHidden ? "hidden" : ""}`;
  return (
    <div className="d-flex">
      <nav className={sidebarClassName}>
        <div className="sidebar_content ps-2 pe-2 mt-3">
          <a href="/" className="sidebar_item mb-2 d-flex">
            <RiDashboardFill className="item_icon me-3 mt-1 mb-1" />
            <div className="item_title">Bảng điều khiển</div>
          </a>
          <a href="/" className="sidebar_item mb-2 d-flex ">
            <FaUser className="item_icon me-3 mt-1 mb-1" />
            <div className="item_title"> Quản lý người dùng </div>
          </a>
          <a href="/" className="sidebar_item mb-2 d-flex">
            <PiSortAscendingLight className="item_icon me-3 mt-1 mb-1" />
            <div className="item_title">Phân loại học </div>
          </a>
          <a href="/" className="sidebar_item mb-2 d-flex content_active">
            <GiSheep className="item_icon me-3 mt-1 mb-1" />
            <div className="item_title">Loài nguy cấp quý hiếm </div>
          </a>
          <a href="/" className="sidebar_item mb-2 d-flex">
            <FaPencilAlt className="item_icon me-3 mt-1 mb-1" />
            <div className="item_title">Bài viết</div>
          </a>
          <a href="/" className="sidebar_item mb-2 d-flex">
            <LuSquareEqual className="item_icon me-3 mt-1 mb-1" />
            <div className="item_title">Phiếu điều xuất</div>
          </a>
          <a href="/" className="sidebar_item mb-2 d-flex">
            <FaBookmark className="item_icon me-3 mt-1 mb-1" />
            <div className="item_title">Danh mục</div>
          </a>
        </div>
      </nav>
    </div>
  );
}
export default SideBar;
