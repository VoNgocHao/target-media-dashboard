import React from "react";
import * as Icon from "react-feather";
import { convertDMY } from "../helper";

function Documents({ documents = [], onSetIsConfirmDel }) {
  return (
    <div className="card">
      <div className="row my-2">
        <div className="col-md-12">
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-xxs font-weight-bolder">
                    Tên File
                  </th>
                  <th className="text-uppercase text-xxs font-weight-bolder ps-2">
                    Ngày cập nhật
                  </th>
                  <th className="text-uppercase text-xxs font-weight-bolder ps-2">
                    Nhân viên upload
                  </th>
                  <th
                    className="text-center text-uppercase text-xxs font-weight-bolder"
                    style={{ width: "100px" }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {documents.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{value.name}</h6>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        <span className="text-secondary text-xs font-weight-bold">
                          {convertDMY(value.updated_at)}
                        </span>
                      </td>
                      <td className="align-middle">
                        <span className="text-secondary text-xs font-weight-bold">
                          {value.full_name}
                        </span>
                      </td>
                      <td className="align-middle text-center">
                        <a
                          className="text-secondary font-weight-bold text-xs"
                          href={`/upload/uploads/${value.name}`}
                        >
                          <Icon.Download size={18} color="#8075ef" />
                        </a>
                        {onSetIsConfirmDel && (
                          <span
                            className="text-secondary font-weight-bold text-xs mx-2"
                            onClick={() => onSetIsConfirmDel(value.name)}
                          >
                            <Icon.X size={18} color="#ff0000" />
                          </span>
                        )}
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
  );
}

export default Documents;
