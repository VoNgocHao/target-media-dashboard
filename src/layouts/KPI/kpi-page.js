import React, { useState, useEffect } from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import Paginator from "../Components/paginato";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { caculatePage, caculateOffSet } from "../helper";
import TextField from "@mui/material/TextField";
import * as Constant from "../constant";
import API from "../api";
import * as Icon from "react-feather";
import FileExcel from "../file/targer_user.xlsx";
import UploadButton from "../Components/UploadButton";
import ExcelJS from "exceljs/dist/exceljs";
import Loading from "../Components/loading";
import { toast } from "react-toastify";
import Confirm from "../Components/confirm";

function KpiPage() {
  const dateNow = new Date();
  const monthN = dateNow.getMonth() + 1;
  const [data, setData] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  const [selectMonth, setselectMonth] = useState(monthN);
  const [selectYear, setSelectYear] = useState(dateNow);
  const [selectTarget, setSelectTarget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stringError, setStringError] = useState([]);
  const [idDeleted, setIdDeleted] = useState("");
  const [idDeletedUser, setIdDeletedUser] = useState("");
  const [isConfirmDel, setIsConfirmDel] = useState(false);

  const [page, setPage] = useState({
    page: 1,
    size: 15,
    totalPages: 10,
  });

  const size = 10;
  useEffect(() => {
    getListKPI(
      1,
      keySearch,
      selectMonth,
      selectYear.getFullYear(),
      selectTarget
    );
  }, []);

  const getListKPI = async (page, ipSearch, month, year, target) => {
    let url = `/api/get-target.php?offset=${caculateOffSet(
      page,
      size
    )}&size=${size}&month=${month}&year=${year}`;
    if (ipSearch !== "" && ipSearch !== null && ipSearch !== undefined) {
      url = url + `&search_term=${ipSearch}`;
    }
    if (target !== "" && target !== null && target !== undefined) {
      url = url + `&target=${target}`;
    }

    const res = await API.getAPIData(url);

    if (res.success) {
      setData(res.data);
      setPage({
        page: page,
        size: size,
        totalPages: caculatePage(res.total, size),
      });
    } else {
      setData([]);
      setPage({
        page: 0,
        size: 0,
        totalPages: 0,
      });
    }
  };

  const onSearch = () => {
    getListKPI(
      1,
      keySearch,
      selectMonth,
      selectYear.getFullYear(),
      selectTarget
    );
  };

  const onReset = () => {
    setselectMonth(monthN);
    setKeySearch("");
    setSelectYear(dateNow);
    setSelectTarget("");
    getListKPI(1, "", monthN, dateNow.getFullYear(), "");
  };

  const importTarget = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const wb = new ExcelJS.Workbook();
    const reader = new FileReader();
    let rows = [];
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const buffer = reader.result;
      let isValid = false;
      await wb.xlsx.load(buffer).then((workbook) => {
        workbook.eachSheet((sheet, id) => {
          sheet.eachRow((row, rowIndex) => {
            const value = row.values;
            if (rowIndex === 1) {
              if (value.toString() === ",EMAIL,MONTH,TARGET,YEAR") {
                isValid = true;
              } else {
                isValid = false;
                toast.error("File template is invalid");
              }
            } else if (isValid && rowIndex > 1) {
              let email = "";
              if (typeof value[1] === "string" || value[1] instanceof String) {
                email = value[1] ? value[1].toString() : "";
              } else {
                email = value[1] ? value[1].text : "";
              }
              rows.push({
                email: email,
                month: value[2],
                value: value[3],
                year: value[4],
              });
            }
          });
        });
        if (isValid) {
          API.postParamArray("/api/save-target.php", rows).then((res) => {
            if (res.success) {
              toast.success("Upload successfully!");
              setStringError([]);
              getListKPI(
                1,
                keySearch,
                selectMonth,
                selectYear.getFullYear(),
                selectTarget
              );
            } else {
              toast.error("Upload false!");
              if (res.error) {
                setStringError(res.error);
              }
            }
          });
        }
      });
      setIsLoading(false);
    };
  };

  const onPageChange = (newPage) => {
    getListKPI(
      newPage,
      keySearch,
      selectMonth,
      selectYear.getFullYear(),
      selectTarget
    );
  };

  const onDeletedKPI = (delId) => {
    setIdDeleted(delId);
    setIsConfirmDel(!isConfirmDel);
  };

  const onDeleted = async () => {
    await API.getAPIData(`/api/delete-user-target.php?id=${idDeleted}`).then(
      (res) => {
        if (res.success) {
          getListKPI(
            page.page,
            keySearch,
            selectMonth,
            selectYear.getFullYear(),
            selectTarget
          );
          onDeletedKPI();
          toast.success("Deleted successfully");
        } else {
          toast.error(res.messages);
        }
      }
    );
  };

  return (
    <section>
      {isLoading && <Loading />}
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="KPI" />
        <div className="container-fluid py-2">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-body">
                  <div className="row my-2">
                    <div className="col-md-3 mb-md-0 mb-4">
                      <div className="input-group input-group-outline">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Find name, email"
                          value={keySearch}
                          onChange={(e) => setKeySearch(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-4">
                      <div className="input-group input-group-outline">
                        <select
                          className="form-control"
                          value={selectMonth}
                          onChange={(e) => {
                            setselectMonth(e.target.value);
                          }}
                        >
                          {Constant.select_month.map((value, index) => {
                            return (
                              <option value={value.value} key={index}>
                                {value.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-4">
                      <div className="input-group input-group-outline">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            views={["year"]}
                            value={selectYear}
                            onChange={(newValue) => {
                              setSelectYear(newValue.$d);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} helperText={null} />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-4">
                      <div className="input-group input-group-outline">
                        <select
                          className="form-control"
                          value={selectTarget}
                          onChange={(e) => setSelectTarget(e.target.value)}
                        >
                          <option value={""}>---Select Target---</option>
                          {Constant.select_target.map((value, index) => {
                            return (
                              <option value={value.value} key={index}>
                                {value.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-4 mb-md-0 mb-4"></div>
                    <div className="col-md-4 mb-md-0 mb-4"></div>
                    <div className="col-md-4 mb-md-0 mb-4">
                      <button
                        className="badge badge-sm btn-background-gr float-right"
                        onClick={() => onSearch()}
                      >
                        <span className="mx-3">
                          <Icon.Search size={18} /> Search
                        </span>
                      </button>
                      <button
                        className="badge badge-sm btn-background-back float-right mx-2"
                        onClick={() => onReset()}
                      >
                        <span className="mx-3">
                          <Icon.Code size={18} /> Reset
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-md-6">
                <ul>
                  {stringError.map((value, index) => {
                    return (
                      <li key={index} className="text-error">
                        - {value}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="col-md-6">
                <UploadButton
                  className="badge badge-sm btn-background-violet float-right mx-2"
                  id="upload-sku"
                  name="Import"
                  onChange={importTarget}
                  accept=".xlsx"
                />
                <button
                  className="badge badge-sm btn-background-green float-right"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.setAttribute("target", "_blank");
                    link.setAttribute("href", FileExcel);
                    link.setAttribute("download", "targer_user.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                  }}
                >
                  <Icon.Download size={18} /> Download file template
                </button>
              </div>
            </div>
            <div className="col-12">
              <div className="card my-1">
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-xxs font-weight-bolder">
                            Author
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Target
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Month
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                    <img
                                      src={"/api/images/" + value.url_avata}
                                      className="avatar avatar-sm me-3 border-radius-lg"
                                      alt="user1"
                                    />
                                  </div>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                      {value.full_name}
                                    </h6>
                                    <p className="text-xs text-secondary mb-0">
                                      {value.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <span className="badge badge-sm bg-gradient-success">
                                  {value.value}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {
                                    Constant.select_month.find(
                                      (x) => x.value === value.month
                                    ).label
                                  }
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <span
                                  className="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                  onClick={() => {
                                    setIdDeletedUser(value.email);
                                    onDeletedKPI(value.targets_id);
                                  }}
                                >
                                  <Icon.X
                                    size={20}
                                    color="#e91e63"
                                    fill="#e91e63"
                                  />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="page-right">
                    <Paginator
                      {...page}
                      onPageChange={(newpage) => onPageChange(newpage)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
      <Confirm
        visible={isConfirmDel}
        header={"Deleted target"}
        title={"Are you sure you want to deleted " + idDeletedUser}
        onClose={onDeletedKPI}
        onConfirm={onDeleted}
      />
    </section>
  );
}

export default KpiPage;
