import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./StyleLogin.css";

import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { SpinningCircles } from "react-loading-icons";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    // 👇 toggle isActive state on click
    setIsActive((prevState) => !prevState);
  };
  const handleSubmit = async (event) => {
    console.log("123");
    console.log(username, password);
    event.preventDefault();
    // Gọi API đăng nhập với email và password
    // Xử lý mã token trả về (nếu có)
    // Lưu mã token vào local storage hoặc state
    setLoading(true);
    try {
      const response = await axios.post(
        "https://wlp.howizbiz.com/api/web-authenticate",
        {
          username,
          password,
        }
      );
      const token = response.data.access_token; // Giả sử API trả về token
      // Lưu mã token vào local storage hoặc state
      localStorage.setItem("token", token);
      console.log(token);

      window.location.href = "http://localhost:3000/page";
      // window.location.href = "http://wlp.howizbiz.com/bang-dieu-khien";
      // Điều hướng người dùng đến trang sau khi đăng nhập thành công
      // Ví dụ: window.location.href = "/dashboard";
    } catch (error) {
      alert("Đăng nhập thất bại !!!");
      console.log(username, password);
    }
    setLoading(false);
  };
  return (
    <>
      <div className=" login_contain">
        <div className="d-flex header_login">
          <div className="ps-3">
            <img
              src="http://wlp.howizbiz.com/static/img/logoColor.e5de23ce.png"
              alt=""
              style={{ height: "70px" }}
            />
          </div>
          <div className="text_header">
            HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </div>
        </div>
        <form className="main_login d-flex  ">
          <div className="card_login">
            <div className="w-100 h-100 px-4 py-6">
              <div className="logo_top align-self-center mt-4">
                <img
                  src="http://wlp.howizbiz.com/static/img/logo.png"
                  alt=""
                  style={{ width: "90px" }}
                />
                <h2 className="mt-3">Đăng Nhập</h2>
              </div>
              <div>
                <div className="input_group">
                  <div className="border_input">
                    <div className="input_login ">
                      <FaUser className="text-secondary align-items-start" />
                      <input
                        type="text"
                        value={username}
                        placeholder="Tên đăng nhập"
                        className="border-0 ps-3 "
                        size={30}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="border_input">
                    <div className="input_login">
                      <FaLock className="text-secondary " />
                      <input
                        type={isActive ? "text" : "password"}
                        value={password}
                        placeholder="Mật khẩu"
                        className="border-0 ps-3 "
                        size={29}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span onClick={handleClick}>
                        {isActive ? (
                          <FaEye className="text-secondary align-self-center" />
                        ) : (
                          <FaEyeSlash className="text-secondary align-self-center" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-danger mb-3 mt-2 w-75 rounded-5"
                  onClick={handleSubmit}
                >
                  {loading && (
                    <SpinningCircles
                      style={{ width: "25px", height: "25px" }}
                    />
                  )}
                  &nbsp; Đăng Nhập
                </button>
                <a
                  href="/"
                  className="d-block text-danger"
                  style={{ textDecoration: "none" }}
                >
                  Quên mật khẩu
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Login;
