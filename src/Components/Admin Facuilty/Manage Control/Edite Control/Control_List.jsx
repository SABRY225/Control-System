import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { setIdControl } from '../../../../Redux/ProfileSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';

const ControlList = () => {
  const fId = useSelector((state) => state.Profile.Fid);
  const tok = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const semester = `${new Date().getFullYear()}/${new Date().getFullYear() - 1}`;

  const [dataControl, setDataControl] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedControl, setSelectedControl] = useState(null);

  useEffect(() => {
    getControl();
  }, [tok]);

  const getControl = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_GETCONTROLSBYFACULITYID}${fId}`,
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      const controlsMatchingSemester = response.data.filter(control => control.acaD_YEAR === semester);
      if (controlsMatchingSemester.length > 0) {
        setDataControl(controlsMatchingSemester);
      } else {
        console.log("No controls found for the specified semester.");
      }
    } catch (error) {
      console.error("Error fetching Data Control data:", error);
    }
  };

  const handleDeleteControl = async () => {
    try {
      if (selectedControl) {
        const response = await axios.delete(
          `${process.env.REACT_APP_DELETECONTROL}${selectedControl}`,
          {
            headers: {
              Authorization: "Bearer " + tok,
              "Content-Type": "application/json",
            },
          }
        );
        getControl();
        const updatedDataControl = dataControl.filter(data => data.id !== selectedControl);
        setDataControl(updatedDataControl);
        toast.success(response.data);
        setShowDeleteModal(false);
      }
    } catch (error) {
      toast.error(error);
      setShowDeleteModal(false);
    }
  };

  const handleEditeControl = (controlId) => {
    dispatch(setIdControl(controlId));
    navigate('/Admin_Faculity/Edite_Control');
  };

  const handleShowDeleteModal = (controlId) => {
    setSelectedControl(controlId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedControl(null);
  };

  return (
    <div className="container mt-4">
      <div className="page rtl">
        {!dataControl.length ? (
          <div className="col-md-12 my-3">
            <p className="text-center fs-2 fw-bold">لا يوجد لجان كنترول في الوقت الحالي</p>
          </div>
        ) : (
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>اسم الكنترول</th>
                <th>تعديل الكنترول</th>
                <th>حذف الكنترول</th>
              </tr>
            </thead>
            <tbody>
              {dataControl.map((control) => (
                <tr key={control.id}>
                  <td>{control.name}</td>
                  <td>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ color: '#6C757D', cursor: 'pointer', fontSize: "1.2rem" }}
                      onClick={() => handleEditeControl(control.id)}
                    >
                      <p className='m-2'>تعديل</p>
                      <FontAwesomeIcon className="mx-2" icon={faCog} />
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ color: '#FF0000', cursor: 'pointer', fontSize: "1.2rem" }}
                      onClick={() => handleShowDeleteModal(control.id)}
                    >
                      <p className='m-2'>حذف</p>
                      <FontAwesomeIcon className="mx-2" icon={faTrashAlt} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>هل تريد ازالة الكنترول نهائيا ؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={handleDeleteControl}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ControlList;
