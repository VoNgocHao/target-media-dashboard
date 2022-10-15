import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import "react-quill/dist/quill.snow.css";
import API from "../api";
import { toast } from "react-toastify";

export default function EditPermission(props) {
  const { visible, onClose, onConfirm, id } = props;
  const [department, setDepartment] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (id) {
      getDepartmenDetail();
      getPermission();
      getDepartmentPermission();
    }
  }, [id]);

  const getDepartmenDetail = async () => {
    await API.getAPIData(`/api/get-department.php?id=${id}`).then((res) => {
      if (res.success) {
        setDepartment({ ...res.data });
      }
    });
  };

  const getPermission = async () => {
    await API.getAPIData(`/api/get-permissions.php`).then((res) => {
      if (res.success) {
        setPermissions([...res.data]);
      }
    });
  };

  const getDepartmentPermission = async () => {
    await API.getAPIData(`/api/get-department-permission.php?id=${id}`).then(
      (res) => {
        if (res.success) {
          const ids = res.data.map((a) => a.permission_id);
          if (ids.length) {
            setSelected([...ids]);
          } else {
            setSelected([]);
          }
        } else {
          setSelected([]);
        }
      }
    );
  };

  const onSelectPermission = (id) => {
    const index = selected.indexOf(id);
    if (index > -1) {
      const newSelect = selected;
      newSelect.splice(index, 1);
      setSelected([...newSelect]);
    } else if (id) {
      setSelected([...selected, id]);
    }
  };

  const onClearAndclose = () => {
    setSelected([]);
    onClose();
  };

  const onCreate = async () => {
    await API.postParam("/api/department-permission-save.php", {
      department_id: id,
      permission_ids: selected || [],
    }).then((res) => {
      if (res.success) {
        toast.success("Update successfully!");
        setSelected([]);
        onConfirm();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Modal size="lg" isOpen={visible}>
      <ModalHeader>
        Grant permission to
        <span>&nbsp;{department && department.department_name}</span>
      </ModalHeader>
      <ModalBody>
        <div>
          <div className="col-12">
            <div className="card">
              <div className="card-body px-0 pt-0">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-xxs font-weight-bolder">
                          Permissions
                        </th>
                        <th
                          className="text-center text-uppercase text-xxs font-weight-bolder"
                          style={{ width: "100px" }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissions.map((value, index) => {
                        const isCheck =
                          selected && selected.find((x) => x === value.id);
                        return (
                          <tr key={index}>
                            <td style={{ maxWidth: "300px" }}>
                              <div className="text-secondary text-xs font-weight-bold show-one-line">
                                {value.name}
                              </div>
                            </td>
                            <td
                              className="align-middle text-center"
                              style={{ width: "100px" }}
                            >
                              <input
                                type={"checkbox"}
                                checked={isCheck}
                                onChange={() => onSelectPermission(value.id)}
                              />
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
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-small btn-light"
            onClick={() => {
              onClearAndclose();
            }}
          >
            Cancel
          </button>
          <Button
            className="bg-gradient-primary"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => onCreate()}
          >
            Update
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
