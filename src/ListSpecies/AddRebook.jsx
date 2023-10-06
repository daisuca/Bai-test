import React, { memo, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Select } from "antd";

const AddRedBook = memo(() => {
  const [book, setRedBook] = useState([]);
  const [iucn, setIUCN] = useState([]);
  const token = localStorage.getItem("token");

  const currentYear = new Date().getFullYear();
  const YEARS = [];
  for (let year = currentYear; year >= 1990; year--) {
    YEARS.push({ nam: year.toString() });
  }
  useEffect(() => {
    fetchRedBook();
  }, []);

  const fetchRedBook = async () => {
    try {
      const response = await axios.get(
        `https://wlp.howizbiz.com/api/danhmuccha?ma_danh_mucs[]=REDBOOK`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = response.data;
      setRedBook(responseData);
      // console.log(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchIUCN();
  }, []);

  const fetchIUCN = async () => {
    try {
      const response = await axios.get(
        `https://wlp.howizbiz.com/api/danhmuccha?ma_danh_mucs[]=IUCN`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = response.data;
      setIUCN(responseData);
      // console.log(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mt-4">
      <h3> III. Tình trạng bảo tồn </h3>
      <div className="row">
        <div className="col col-6">
          <div>
            <h3> Sách đỏ </h3>
            <div className="d-flex">
              <div className="col col-6 me-2">
                <div className="ms-2">Năm</div>
                <Select
                  style={{ width: "100%" }}
                  options={
                    YEARS &&
                    YEARS.map((data) => {
                      return {
                        label: data.nam,
                        value: data.nam,
                      };
                    })
                  }
                  // value={namIucn}
                  // onChange={(value) => setNamiucn(value)}
                />
              </div>
              <div className="col col-6">
                <div className="ms-2">Hiện trạng</div>
                <Select
                  style={{ width: "100%" }}
                  options={
                    // book &&
                    book.map((data) => {
                      return {
                        label: `${data.ma_danh_muc} - ${data.ten}`,
                        value: data.id,
                      };
                    })
                  }
                  // value={sinhCanhid}
                  // onChange={(value) => setSinhcanhid(value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col col-6">
          <div>
            <h3> IUCN </h3>
            <div className="d-flex">
              <div className="col col-6 me-2">
                <div className="ms-2">Năm</div>
                <Select
                  style={{ width: "100%" }}
                  options={
                    YEARS &&
                    YEARS.map((data) => {
                      return {
                        label: data.nam,
                        value: data.nam,
                      };
                    })
                  }
                  // value={namIucn}
                  // onChange={(value) => setNamiucn(value)}
                />
              </div>
              <div className="col col-6">
                <div className="ms-2">Hiện trạng</div>
                <Select
                  style={{ width: "100%" }}
                  options={
                    iucn &&
                    iucn.map((data) => {
                      return {
                        label: `${data.ma_danh_muc} - ${data.ten}`,
                        value: data.id,
                      };
                    })
                  }
                  // value={suyGiamid}
                  // onChange={(value) => setSuygiamid(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default AddRedBook;
