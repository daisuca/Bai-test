import React, { useState, useEffect } from "react";
import axios from "axios";
import { LuMenu } from "react-icons/lu";
import "./header.css";
import SideBar from "./sidebar";

function DefaultPage({ updatePadding, toggleSidebar, isSidebarHidden }) {
  const [data, setData] = useState([]);
  //   const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  useEffect(() => {
    // Khi trạng thái của Sidebar thay đổi, hãy cập nhật giá trị CSS cho phần tử khác
    updatePadding();
  }, [isSidebarHidden, updatePadding]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://wlp.howizbiz.com/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data;
      setData(responseData.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //   const toggleSidebar = () => {
  //     setIsSidebarHidden(!isSidebarHidden);

  //   };

  return (
    <>
      <div className="w-100 header_user d-flex">
        <div className="d-flex">
          <button
            type="button"
            className="button_icon btn  ms-3"
            onClick={toggleSidebar}
          >
            <LuMenu />
          </button>

          <img
            src="http://wlp.howizbiz.com/static/img/logo.png"
            alt=""
            className="logo_head mt-1 me-3 ms-3"
          />

          <div className="ms-4 mt-3">
            <h3 style={{ fontSize: "20px" }}>
              {" "}
              HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU
              TIÊN BẢO VỆ{" "}
            </h3>
          </div>
        </div>
        <div className="space flex-grow-1"></div>
        <button type="button" className="tk_user btn mt-2">
          <div className="button_content d-flex">
            <div className="avata me-2">
              <img
                src={`http://wlp.howizbiz.com/${data?.role?.meta?.image}`}
                alt=""
                className="avarta_img w-100 "
              />
            </div>
            <div className="avatar_text">{data.role?.name}</div>
          </div>
        </button>
      </div>
      <SideBar isHidden={isSidebarHidden} />
    </>
  );
}

export default DefaultPage;
