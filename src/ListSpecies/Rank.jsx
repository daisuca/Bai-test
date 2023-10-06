import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddRedBook from "../ListSpecies/AddRebook";
import DefaultPage from "../ListSpecies/Default";
import { toast } from "react-toastify";
import SelectComponent from "./SelectComponent ";
import "react-toastify/dist/ReactToastify.css";

function Rank() {
  const [mainElementCSS, setMainElementCSS] = useState({});
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [kingdom, setKingdom] = useState([]);
  const [phylum, setPhylum] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [order, setOrder] = useState([]);
  const [family, setFamily] = useState([]);
  const [genus, setGenus] = useState([]);

  const [kingdomList, setKingdomList] = useState([]);
  const [phylumList, setPhylumList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [familyList, setFamilyList] = useState([]);
  const [genusList, setGenusList] = useState([]);

  const token = localStorage.getItem("token");

  const [ten, setTen] = useState("");
  const [tenKhoahoc, setTenkhoahoc] = useState("");
  const [tenTacgia, setTentacgia] = useState("");
  const [tenDiaphuong, setTendiaphuong] = useState("");
  const [nguonDulieu, setNguondulieu] = useState("");
  const [kingId, setKingid] = useState("");
  const [phylumId, setPhylumid] = useState("");
  const [classId, setClassid] = useState("");
  const [orderId, setOderid] = useState("");
  const [familyId, setFamilyid] = useState("");
  const [genusId, setGenusid] = useState("");

  const [validateError, setValidateError] = useState([]);
  const navigt = useNavigate();
  const updatePadding = () => {
    const newMainElementCSS = isSidebarHidden
      ? { padding: "70px 0px 33px 80px" }
      : { padding: "70px 0px 33px 340px" };
    setMainElementCSS(newMainElementCSS);
  };
  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  useEffect(() => {
    const fetchData = async (rank, setStateFunc, listSetter) => {
      try {
        const response = await axios.get(
          `https://wlp.howizbiz.com/api/phanloaihoc?ranks[]=${rank}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = response.data;
        setStateFunc(responseData);
        listSetter(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData("Kingdom", setKingdom, setKingdomList);
    fetchData("Phylum", setPhylum, setPhylumList);
    fetchData("Class", setClassdata, setClassList);
    fetchData("Order", setOrder, setOrderList);
    fetchData("Family", setFamily, setFamilyList);
    fetchData("Genus", setGenus, setGenusList);
  }, [token]);

  // console.log(kingdomList);

  useEffect(() => {
    if (kingId) {
      setPhylumList(phylum.filter((data) => data.parent_id === kingId));
    }
    if (phylumId) {
      setClassList(classdata.filter((data) => data.parent_id === phylumId));
    }
    if (classId) {
      setOrderList(order.filter((data) => data.parent_id === classId));
    }
    if (orderId) {
      setFamilyList(family.filter((data) => data.parent_id === orderId));
    }
    if (familyId) {
      setGenusList(genus.filter((data) => data.parent_id === familyId));
    }
  }, [kingId, phylumId, classId, orderId, familyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ten: ten,
      ten_khoa_hoc: tenKhoahoc,
      genus_id: genusId,
      family_id: familyId,
      order_id: orderId,
      class_id: classId,
      phylum_id: phylumId,
      kingdom_id: kingId,
      nguon_du_lieu: nguonDulieu,
      ten_dia_phuong: tenDiaphuong,
      ten_tac_gia: tenTacgia,

      toa_dos: [],
    };
    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData({
    //     ...formData,
    //     [name]: value,
    //   });
    // };
    try {
      const response = await axios.post(
        `https://wlp.howizbiz.com/api/species`,
        JSON.stringify(formData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast.success("Thêm loài thành công");
      navigt("/page");
    } catch (error) {
      console.error("Error fetching data:", error);
      setValidateError(error.response.data.errors);
      console.log(validateError);
    }
    console.log(formData);
  };

  return (
    <>
      <DefaultPage
        updatePadding={updatePadding}
        toggleSidebar={toggleSidebar}
        isSidebarHidden={isSidebarHidden}
      />
      <main style={mainElementCSS}>
        <div className="px-6 py-3">
          <div className="text-center pt-2 pb-4 d-flex">
            <div className="me-1">
              <button
                className="btn text-danger"
                onClick={() => navigt("/page")}
              >
                <FiArrowLeft style={{ fontSize: "36px" }} />
              </button>
            </div>
            <div className="d-flex align-center mt-2">
              <h2 style={{ fontSize: "24px" }}>
                {" "}
                THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU
                TIÊN BẢO VỆ{" "}
              </h2>
            </div>
          </div>
          <form>
            <div>
              <h3>I. Thông tin chung về loài</h3>
              <div className="row">
                <div className="col col-9">
                  <div className="row">
                    <div className="col col-12 " style={{ padding: "12px" }}>
                      <div>
                        Tên
                        <span className="text-danger">*</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="ten"
                          placeholder="Tên"
                          className="w-100 input_box"
                          value={ten}
                          onChange={(e) => setTen(e.target.value)}
                        />
                      </div>
                      <div className="error-message-form mt-2 text-danger">
                        {validateError.ten}
                      </div>
                    </div>
                    <div className="col col-6" style={{ padding: "12px" }}>
                      <div>
                        Tên khoa học
                        <span className="text-danger">*</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="ten_khoa_hoc"
                          placeholder="Tên khoa học"
                          className="w-100 input_box"
                          value={tenKhoahoc}
                          onChange={(e) => setTenkhoahoc(e.target.value)}
                        />
                      </div>
                      <div className="error-message-form mt-2 text-danger">
                        {validateError.ten_khoa_hoc}
                      </div>
                    </div>
                    <div className="col col-6" style={{ padding: "12px" }}>
                      <div>Tên tác giả</div>
                      <div>
                        <input
                          type="text"
                          name="ten_tac_gia"
                          placeholder="Tên tác giả"
                          className="w-100 input_box"
                          value={tenTacgia}
                          onChange={(e) => setTentacgia(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col col-12" style={{ padding: "12px" }}>
                      <div>Tên địa phương</div>
                      <div>
                        <input
                          type="text"
                          name="ten_dia_phuong"
                          placeholder="Tên địa phương "
                          className="w-100 input_box"
                          value={tenDiaphuong}
                          onChange={(e) => setTendiaphuong(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col col-12" style={{ padding: "12px" }}>
                      <div>Nguồn dữ liệu</div>
                      <div>
                        <input
                          type="text"
                          name="nguon_du_lieu"
                          placeholder="Nguồn dữ liệu"
                          className="w-100 input_box"
                          value={nguonDulieu}
                          onChange={(e) => setNguondulieu(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div>
                <div className="d-flex">
                  <h3 className="me-3">II. Phân loại học</h3>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ borderRadius: "50%" }}
                  >
                    <FaPlusCircle />
                  </button>
                </div>
                <div className="row">
                  <div className="col col-4" style={{ padding: "12px" }}>
                    <div>
                      Giới
                      <span className="text-danger">*</span>
                    </div>
                    <div>
                      <SelectComponent
                        placeholder="Giới"
                        options={
                          kingdomList &&
                          kingdomList.map((data) => {
                            return {
                              label: `${data.ten_khoa_hoc} - ${data.ten}`,
                              value: data.uuid,
                            };
                          })
                        }
                        value={kingId}
                        onChange={(value) => {
                          console.log(value);
                          setKingid(value);
                        }}
                      />
                    </div>
                    <div className="error-message-form mt-2 text-danger">
                      {validateError.kingdom_id}
                    </div>
                  </div>
                  <div className="col col-4" style={{ padding: "12px" }}>
                    <div>
                      Ngành
                      <span className="text-danger">*</span>
                    </div>
                    <div>
                      <SelectComponent
                        placeholder="Ngành"
                        style={{ width: "100%" }}
                        options={
                          phylumList &&
                          phylumList.map((data) => {
                            return {
                              label: `${data.ten_khoa_hoc}${
                                data.ten ? ` - ${data.ten}` : ""
                              }`,
                              value: data.uuid,
                            };
                          })
                        }
                        value={phylumId}
                        onChange={(value) => {
                          console.log(value);
                          setPhylumid(value);
                        }}
                      />
                    </div>
                    <div className="error-message-form mt-2 text-danger">
                      {validateError.phylum_id}
                    </div>
                  </div>
                  <div className="col col-4" style={{ padding: "12px" }}>
                    <div>
                      Lớp
                      <span className="text-danger">*</span>
                    </div>
                    <div>
                      <SelectComponent
                        placeholder="Lớp"
                        style={{ width: "100%" }}
                        options={
                          classList &&
                          classList.map((data) => {
                            return {
                              label: `${data.ten_khoa_hoc}${
                                data.ten ? ` - ${data.ten}` : ""
                              }`,
                              value: data.uuid,
                            };
                          })
                        }
                        value={classId}
                        onChange={(value) => {
                          console.log(value);
                          setClassid(value);
                        }}
                      />
                    </div>
                    <div className="error-message-form mt-2 text-danger">
                      {validateError.class_id}
                    </div>
                  </div>
                  <div className="col col-4" style={{ padding: "12px" }}>
                    <div>
                      Bộ
                      <span className="text-danger">*</span>
                    </div>
                    <div>
                      <SelectComponent
                        placeholder="Bộ"
                        style={{ width: "100%" }}
                        name="order_id"
                        options={
                          orderList &&
                          orderList.map((data) => {
                            return {
                              label: `${data.ten_khoa_hoc}${
                                data.ten ? ` - ${data.ten}` : ""
                              }`,
                              value: data.uuid,
                            };
                          })
                        }
                        value={orderId}
                        onChange={(value) => {
                          console.log(value);
                          setOderid(value);
                        }}
                      />
                    </div>
                    <div className="error-message-form mt-2 text-danger">
                      {validateError.order_id}
                    </div>
                  </div>
                  <div className="col col-4" style={{ padding: "12px" }}>
                    <div>
                      Họ
                      <span className="text-danger">*</span>
                    </div>
                    <div>
                      <SelectComponent
                        placeholder="Họ"
                        style={{ width: "100%" }}
                        options={
                          familyList &&
                          familyList.map((data) => {
                            return {
                              label: `${data.ten_khoa_hoc}${
                                data.ten ? ` - ${data.ten}` : ""
                              }`,
                              value: data.uuid,
                            };
                          })
                        }
                        value={familyId}
                        onChange={(value) => {
                          console.log(value);
                          setFamilyid(value);
                        }}
                      />
                    </div>
                    <div className="error-message-form mt-2 text-danger">
                      {validateError.family_id}
                    </div>
                  </div>
                  <div className="col col-4" style={{ padding: "12px" }}>
                    <div>
                      Chi
                      <span className="text-danger">*</span>
                    </div>
                    <div>
                      <SelectComponent
                        placeholder="Chi"
                        style={{ width: "100%" }}
                        options={
                          genusList &&
                          genusList.map((data) => {
                            return {
                              label: data.ten_khoa_hoc,
                              value: data.uuid,
                            };
                          })
                        }
                        value={genusId}
                        onChange={(value) => {
                          console.log(value);
                          setGenusid(value);
                        }}
                      />
                    </div>
                    <div className="error-message-form mt-2 text-danger">
                      {validateError.genus_id}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AddRedBook
            // formData={formData}
            // handleInputChange={handleInputChange}
            />
            <div className="d-flex">
              <div className="ms-auto mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  <span> Thêm mới </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
export default Rank;
