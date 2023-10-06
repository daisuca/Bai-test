import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Pagination } from "antd";
import { MdOutlineDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { BiPlus } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
// import Update from "./Update";

function TableSpecies({ mainPadding }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemperpage] = useState(10);

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    console.log(page);
    console.log(pageSize);
    setItemperpage(pageSize);
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, search]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://wlp.howizbiz.com/api/species?paginate=true&page=${currentPage}&perpage=${itemsPerPage}&with=roles,createdBy&search=${search}&inactive=-1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = response.data;
      setData(responseData);
      setTotal(responseData.pagination.total);
      setItemperpage(responseData.pagination.itemsPerPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSizeChange = (current, size) => {
    setCurrentPage(current);
    setItemperpage(size);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <main className="main_user" style={mainPadding}>
        <div className="d-flex pb-4">
          <RiAccountCircleFill
            style={{ width: "35px", height: "35px" }}
            className="me-2"
          />
          <div className="title_user mt-1"> Loài nguy cấp quý hiếm</div>
        </div>
        <div className="search_form row pb-3">
          <div className="col-9 input-group " style={{ maxWidth: "800px" }}>
            <GoSearch className="me-2 mt-2 ms-1 icon_search" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc số điện thoại"
              className="ps-4 form-control"
              onChange={handleSearch}
            />
          </div>
          <div className="col-4"></div>

          <button
            type="button"
            className="col-1 btn btn-danger rounded-1"
            onClick={() => navigate("/add")}
          >
            <BiPlus className="me-2" />
            <span>Thêm mới</span>
          </button>
        </div>
        <div className="table_list">
          <Table responsive="sm">
            <thead className="head_table">
              <tr>
                <th className="col">Tên</th>
                <th className="col">Tên khoa học</th>
                <th className="col">Giới</th>
                <th className="col">Ngành</th>
                <th className="col">Lớp</th>
                <th className="col">Bộ</th>
                <th className="col">Họ</th>
                <th className="col">Chi</th>
                <th className="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data?.list?.map((item) => (
                <ImgSpecies item={item} key={item.id} fetchData={fetchData} />
              ))}
            </tbody>
          </Table>
        </div>

        <Pagination
          className="pagination_tab"
          current={currentPage}
          showSizeChanger
          pageSizeOptions={["10", "20", "25", "50"]}
          total={total}
          onChange={onPageChange}
          onShowSizeChange={handleSizeChange}
        />
      </main>
    </>
  );
}
function ImgSpecies({ item, fetchData }) {
  let imgSrc = "http://wlp.howizbiz.com/static/img/favicon.e4ca0e6e.png";
  if (item.attachments && item.attachments[0] && item.attachments[0].path) {
    imgSrc = "http://wlp.howizbiz.com" + item.attachments[0].path;
  }
  const token = localStorage.getItem("token");
  const navi = useNavigate();
  const [show, setShow] = useState(false);
  const openShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const updatePage = (id) => {
    console.log(id);

    navi(`/update/${id}`);
  };
  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(
        `https://wlp.howizbiz.com/api/species/` + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);

      toast.success("Xoá loài thành công");
      fetchData();

      navi("/page");
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Xoá loài thất bại");
    }
  };

  return (
    <tr>
      <td>
        <img
          src={imgSrc}
          alt=""
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            marginRight: "5px",
          }}
        />
        {item.ten}
      </td>
      <td>{item.ten_khoa_hoc}</td>
      <td>{item.kingdom.ten}</td>
      <td>{item.phylumn.ten}</td>
      <td>{item.class.ten}</td>
      <td>{item.order.ten_khoa_hoc}</td>
      <td>{item.family.ten_khoa_hoc}</td>
      <td>{item.genus.ten_khoa_hoc}</td>
      <td>
        <HiPencil
          className="text-danger mx-2"
          style={{ cursor: "pointer" }}
          onClick={() => updatePage(item.id)}
        />
        <Button variant="btn" onClick={openShow}>
          <MdOutlineDelete
            className="text-danger"
            style={{ cursor: "pointer" }}
          />
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bạn có chắc chắn không?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc muốn xóa? Điều này hoàn toàn không thế hoàn tác!{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Không
            </Button>
            <Button variant="danger" onClick={() => handleDelete(item.id)}>
              <Button variant="danger" onClick={handleClose}>
                Áp dụng
              </Button>
            </Button>
          </Modal.Footer>
        </Modal>
      </td>
    </tr>
  );
}
export default TableSpecies;
