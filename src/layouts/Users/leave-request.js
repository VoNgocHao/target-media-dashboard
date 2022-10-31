import React, { useState, useEffect } from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import * as Icon from "react-feather";
import { convertDMY } from "../helper";
import Loading from "../Components/loading";
import Confirm from "../Components/confirm";
import { toast } from "react-toastify";
import API from "../api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { select_month } from "../constant";
import "dayjs/locale/fr";

function LeaveRequest() {
  document.title = "Duyệt Nghỉ phép - Ngày off";
  const dateNow = new Date();
  const [leaveOffs, setLeaveOffs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setID] = useState("");
  const [selectYear, setSelectYear] = useState(dateNow);
  const [selectMonth, setSelectMonth] = useState(dateNow.getMonth() + 1);
  const [userName, setUserName] = useState("");
  const [isApprove, setIsApprove] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getLeaveOffs(selectYear.getFullYear(), selectMonth, isApprove);
    setIsLoading(false);
  }, []);

  const getLeaveOffs = async (year, month, approve) => {
    let url = `/api/leave-off.php?year=${year}&month=${month}&approve=${approve}`;
    const res = await API.getAPIData(url);

    if (res.success) {
      setLeaveOffs(res.data);
    } else {
      setLeaveOffs([]);
    }
  };

  const onConfirmSubmit = (id, full_name) => {
    setUserName(full_name);
    setID(id);
  };

  const onResetPassword = async () => {
    setIsLoading(true);
    onConfirmSubmit();
    await API.getAPIData(`/api/leave-off-user-approve.php?id=${id}`)
      .then((res) => {
        if (res.success) {
          getLeaveOffs(selectYear.getFullYear(), selectMonth, isApprove);
          toast.success("Đã duyệt thành công!");
        } else {
          toast.error(res.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section>
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="Duyệt Nghỉ phép - Ngày off" />
        <div className="container-fluid py-2">
          {isLoading && <Loading />}
          <div className="row">
            <div className="row my-2">
              <div className="d-flex col-md-3">
                <div style={{ alignSelf: "center", width: "70px" }}>Month:</div>
                <div
                  className="input-group input-group-outline"
                  style={{ width: "200px" }}
                >
                  <select
                    className="form-control"
                    value={selectMonth}
                    onChange={(e) => {
                      setSelectMonth(e.target.value);
                      getLeaveOffs(
                        selectYear.getFullYear(),
                        e.target.value,
                        isApprove
                      );
                    }}
                  >
                    {select_month.map((item) => {
                      return (
                        <option value={item.value} key={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="d-flex col-md-3">
                <div style={{ alignSelf: "center", width: "70px" }}>Year: </div>
                <div
                  className="input-group input-group-outline"
                  style={{ width: "200px", display: "inline-block" }}
                >
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={"fr"}
                  >
                    <DatePicker
                      views={["year"]}
                      value={selectYear}
                      onChange={(newValue) => {
                        setSelectYear(newValue.$d);
                        getLeaveOffs(newValue.$y, selectMonth, isApprove);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} helperText={null} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="d-flex col-md-3">
                <input
                  type={"checkbox"}
                  checked={isApprove}
                  onChange={() => {
                    setIsApprove(!isApprove);
                    getLeaveOffs(
                      selectYear.getFullYear(),
                      selectMonth,
                      !isApprove
                    );
                  }}
                />
                <span style={{ alignSelf: "center", marginLeft: "5px" }}>
                  Đơn chờ duyệt
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-body px-0 pt-0">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-xxs font-weight-bolder">
                            Nhân viên
                          </th>
                          <th className="text-uppercase text-xxs font-weight-bolder">
                            Loại đơn
                          </th>
                          <th className="text-uppercase text-xxs font-weight-bolder ps-2">
                            Nội dung
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Từ ngày
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Đến ngày
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Tổng ngày nghỉ
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveOffs.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                      {value.full_name}
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="text-xs font-weight-bold mb-0">
                                  {value.type_name}
                                </div>
                              </td>
                              <td>
                                <p
                                  className="text-xs font-weight-bold mb-0"
                                  style={{ whiteSpace: "normal" }}
                                >
                                  {value.content}
                                </p>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {convertDMY(value.off_from)}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {convertDMY(value.off_to)}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                {value.date_off}
                              </td>
                              <td className="align-middle text-center">
                                <span
                                  className="text-secondary font-weight-bold text-xs cursor-pointer p-1"
                                  onClick={() =>
                                    onConfirmSubmit(value.id, value.full_name)
                                  }
                                >
                                  <Icon.CheckSquare size={20} color="#0d33f9" />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
      <Confirm
        visible={!!id}
        header={"Duyệt ngày phép/off"}
        title={`Bạn muốn xác nhận duyệt ngày phép của ${userName}?`}
        onClose={onConfirmSubmit}
        onConfirm={onResetPassword}
      />
    </section>
  );
}

export default LeaveRequest;
