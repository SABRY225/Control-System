import React, { useCallback, useEffect, useState } from "react";
import "../../StyleHeadofControl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faPaperPlane,
  faTrash,
  faChevronDown, // إضافة رمز faChevronDown هنا
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button, Card, Form, Col, Row, Badge } from 'react-bootstrap';

export default function TaskOfControl() {
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [controlDetails, setControlDetails] = useState({
    selectedSubject: "",
    selectedUsers: "",
  });
  const [selectUsers, setSelectUsers] = useState([]);
  const [selectSubjects, setSelectSubjects] = useState([]);
  const [controlMembers, setControlsMember] = useState([]);
  const [controlSubjects, setControlsSubject] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const getControlMember = useCallback(() => {
    const fetchControlMember = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_GETUSERSFORCONTROL,
          {
            params: { controlId: control.control.id },
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setControlsMember(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchControlMember();
  }, [control.control.id, tok]);

  const getControlSubject = useCallback(() => {
    const fetchControlSubject = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SUBJECTSOFCONTROL,
          {
            params: { Cid: control.control.id },
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setControlsSubject(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchControlSubject();
  }, [control.control.id, tok]);

  const getTasks = useCallback(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_GETTASKSBYCONTROLID+control.control.id ,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setTasks(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTasks();
  }, [control.control.id, tok]);

  useEffect(() => {
    getControlMember();
    getControlSubject();
    getTasks();
  }, [getControlMember, getTasks, getControlSubject]);

  const handleAddMember = () => {
    const { selectedUsers } = controlDetails;
    if (selectedUsers) {
      const user = controlMembers.find((e) => e.user.id === selectedUsers);
      if (user && !selectUsers.some((u) => u.user.id === user.user.id)) {
        setSelectUsers((prev) => [...prev, user]);
        setControlsMember((prev) =>
          prev.filter((u) => u.user.id !== user.user.id)
        );
        setControlDetails((prevDetails) => ({
          ...prevDetails,
          selectedUsers: "",
        }));
      } else {
        toast.error("This member is already added.")
      }
    }
  };

  const handleAddSubject = () => {
    const { selectedSubject } = controlDetails;
    if (selectedSubject) {
      const subject = controlSubjects.find((e) => e.id === selectedSubject);
      if (subject && !selectSubjects.some((s) => s.id === subject.id)) {
        setSelectSubjects((prev) => [...prev, subject]);
        setControlsSubject((prev) =>
          prev.filter((s) => s.id !== subject.id)
        );
        setControlDetails((prevDetails) => ({
          ...prevDetails,
          selectedSubject: "",
        }));
      } else {
        toast.error("This subject is already added.")
      }
    }
  };

  const handleRemoveUser = (userToRemove) => {
    setSelectUsers((prevUsers) =>
      prevUsers.filter((user) => user.user.id !== userToRemove.user.id)
    );
    setControlsMember((prev) => [...prev, userToRemove]);
  };

  const handleRemoveSubject = (subjectToRemove) => {
    setSelectSubjects((prevSubjects) =>
      prevSubjects.filter((subject) => subject.id !== subjectToRemove.id)
    );
    setControlsSubject((prev) => [...prev, subjectToRemove]);
  };

  const onSendTask = async (event) => {
    event.preventDefault();
    let description = selectSubjects.map((subject) => subject.name).join("-");
    let userTaskIds = selectUsers.map((user) => user.user.id);

    try {
      await axios.post(
        process.env.REACT_APP_CREATETASK+control.control.id ,
        JSON.stringify({ description, userTaskIds }),
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      getTasks();
      toast.success("Task created successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async () => {
    if (selectedTask) {
      try {
        await axios.delete(
          process.env.REACT_APP_DELETETASK+selectedTask,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask));
        setShowDeleteModal(false);
        toast.success("Task deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const handleShowDeleteModal = (taskId) => {
    setSelectedTask(taskId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedTask(null);
  };

  return (
    <>
      <ToastContainer />
      <div className="container my-4">
        <Row className="mb-4">
          <Col className="text-end">
            <h3>إنشاء مهام لأعضاء الكنترول</h3>
          </Col>
        </Row>
        <Card>
          <Card.Body>
            <Form onSubmit={onSendTask}>
              <Row className="mb-3">
                <Col md={5}>
                  <Form.Group controlId="selectUsers">
                    <Form.Label>الأعضاء</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        as="select"
                        value={controlDetails.selectedUsers}
                        onChange={(e) => {
                          setControlDetails({
                            ...controlDetails,
                            selectedUsers: e.target.value,
                          });
                        }}
                      >
                        <option value="#">اختر عضو</option>
                        {controlMembers.map((member) => (
                          member.jobType === "Member" &&
                          <option key={member.user.id} value={member.user.id}>
                            {member.user.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Button
                        variant="info"
                        className="ms-2"
                        onClick={handleAddMember}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={2} className="text-center d-none d-md-block align-self-center">
                  <FontAwesomeIcon icon={faChevronDown} size="2x" />
                </Col>
                <Col md={5}>
                  <Form.Group controlId="selectSubjects">
                    <Form.Label>المواد</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        as="select"
                        value={controlDetails.selectedSubject}
                        onChange={(e) => {
                          setControlDetails({
                            ...controlDetails,
                            selectedSubject: e.target.value,
                          });
                        }}
                      >
                        <option value="#">اختر مادة</option>
                        {controlSubjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Button
                        variant="info"
                        className="ms-2"
                        onClick={handleAddSubject}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h5>الأعضاء المختارون</h5>
                  <div className="d-flex flex-wrap">
                    {selectUsers.map((user) => (
                      <Badge
                        pill
                        key={user.user.id}
                        bg="secondary"
                        className="me-2 mb-2"
                      >
                        {user.user.name}
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="ms-2"
                          onClick={() => handleRemoveUser(user)}
                          style={{ cursor: "pointer" }}
                        />
                      </Badge>
                    ))}
                  </div>
                </Col>
                <Col md={6}>
                  <h5>المواد المختارة</h5>
                  <div className="d-flex flex-wrap">
                    {selectSubjects.map((subject) => (
                      <Badge
                        pill
                        key={subject.id}
                        bg="secondary"
                        className="me-2 mb-2"
                      >
                        {subject.name}
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="ms-2"
                          onClick={() => handleRemoveSubject(subject)}
                          style={{ cursor: "pointer" }}
                        />
                      </Badge>
                    ))}
                  </div>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                  >
                    ارسال المهمة <FontAwesomeIcon icon={faPaperPlane} />
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>

      <div className="container">
        <Row className="mt-4 mb-2">
          <Col className="text-end">
            <h3>مهام أعضاء الكنترول</h3>
          </Col>
        </Row>
        <Row>
          {tasks.map((task) => {
            let dateObj = new Date(task.creationDate);
            let formattedDate = dateObj.toLocaleDateString('ar-EG');

            return (
              <Col md={5} className="mb-3" key={task.id}>
                <Card>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>{formattedDate}</div>
                    <div>
                      {task.isDone ? (
                        <Badge bg="success">انتهت</Badge>
                      ) : (
                        <Badge bg="danger">لم تنتهي</Badge>
                      )}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="ms-3"
                        onClick={() => handleShowDeleteModal(task.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-center">{task.description}</Card.Title>
                    <Card.Text className="text-end">
                      <ul>
                        {task.users.map((user) => (
                          <li key={user.id}>{user.name}</li>
                        ))}
                      </ul>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>هل تريد ازالة المهمة ؟؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={deleteTask}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
