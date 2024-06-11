import React, { useCallback, useEffect, useState } from "react";
import "../../StyleHeadofControl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faChevronDown,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function TaskOfControl() {
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [controlDetails, setControlDetails] = useState({
    controlName: "",
    academicYear: "",
    term: "",
    startDate: "",
    endDate: "",
    selectedSubject: "",
    selectedUsers: "",
  });
  const [selectUsers, setSelectUsers] = useState([]);
  const [selectSubjects, setSelectSubjects] = useState([]);
  const [controlMembers, setControlsMember] = useState([]);
  const [controlSubjects, setControlsSubject] = useState([]);
  const [tasks, setTasks] = useState([]);

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

  const deleteTask = async ({ id }) => {
    if (window.confirm("هل تريد ازالة المهمة ؟؟")) {
      try {
        await axios.delete(
          process.env.REACT_APP_DELETETASK+id,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };

  return (
    <>
     <ToastContainer />
      <div className="row text-end m-3">
        <div className="col-12 Title-Task">انشاء مهام لأعضاء الكنترول</div>
      </div>
      <form  onSubmit={onSendTask}>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="col">
              <div className="d-flex justify-content-center mb-3 rtl">
                <select
                  className="form-select"
                  style={{
                    backgroundColor: "#CFEEFF",
                    color: "black",
                  }}
                  onChange={(e) => {
                    setControlDetails({
                      ...controlDetails,
                      selectedUsers: e.target.value,
                    });
                  }}
                  value={controlDetails.selectedUsers}
                >
                  <option value="#">الأعضاء</option>
                  {controlMembers.map((member) => {
                    if (member.jobType === "Member")
                      return (
                        <option key={member.user.id} value={member.user.id}>
                          {member.user.name}
                        </option>
                      );
                  })}
                </select>
                <button
                  className="btn mx-3"
                  onClick={handleAddMember}
                  type="button"
                  style={{ backgroundColor: "#43BBFF", color: "white" }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div
                className="rectangle-container fs-5 rounded-2 p-3"
                style={{ backgroundColor: "#EBF8FF" }}
              >
                <h5 className="mb-3">أعضاء الكنترول</h5>
                <div className="row justify-content-center align-items-center">
                  {selectUsers.map((user) => {
                    return (
                      <div
                        key={user.user.id}
                        className="subject-row col-10 col-sm-5 rounded-2 mx-2 my-2 d-flex justify-content-between align-items-center"
                        style={{
                          backgroundColor: "#D9D9D9",
                          color: "black",
                          padding: "10px",
                        }}
                      >
                        <span style={{ margin: "0rem 1rem", fontSize: "0.9rem" }}>
                          {user.user.name}
                        </span>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          style={{
                            color: "#FF0000",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemoveUser(user)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-1 text-center d-none d-md-block toTask">
            <div>To</div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="col">
              <div className="d-flex justify-content-center mb-3">
                <select
                  className="form-select"
                  style={{
                    backgroundColor: "#CFEEFF",
                    color: "black",
                  }}
                  onChange={(e) =>
                    setControlDetails({
                      ...controlDetails,
                      selectedSubject: e.target.value,
                    })
                  }
                  value={controlDetails.selectedSubject}
                >
                  <option value="">المواد</option>
                  {controlSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn mx-3"
                  onClick={handleAddSubject}
                  style={{ backgroundColor: "#43BBFF", color: "white" }}
                  type="button"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div
                className="rectangle-container fs-5 rounded-2 p-3"
                style={{ backgroundColor: "#EBF8FF" }}
              >
                <h5 className="mb-3">المواد</h5>
                <div className="row justify-content-center align-items-center">
                  {selectSubjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="subject-row col-10 col-sm-5 rounded-2 mx-2 my-2 d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor: "#D9D9D9",
                        color: "black",
                        padding: "10px",
                      }}
                    >
                      <span style={{ margin: "0rem 1rem", fontSize: "0.9rem" }}>
                        {subject.name}
                      </span>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{
                          color: "#FF0000",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRemoveSubject(subject)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row text-center m-3">
          <div className="col">
            <button
              className="btn btn-info p-2"
              style={{
                width: "200px",
                fontSize: "20px",
                background: "rgb(67, 187, 255)",
                color: "#FFFFFF",
              }}
            >
              ارسال المهمة <FontAwesomeIcon icon={faPaperPlane} />{" "}
            </button>
          </div>
        </div>
      </form>
      
      <div className="container">
        <div className="row">
          <hr />
        </div>
      </div>
      <div className="container">
        <div className="row text-end m-3">
          <div className="col-12 Title-Task">مهام أعضاء الكنترول</div>
        </div>
      </div>
      <div className="row justify-content-center m-2">
        {tasks.map((task) => {
          let dateObj = new Date(task.creationDate);
          let year = dateObj.getFullYear();
          let month = dateObj.getMonth() + 1;
          let day = dateObj.getDate();

          return (
            <div className="col-md-5 task m-2" key={task.id}>
              <div className="col-12 d-flex task-head p-2 ">
                <div className="col-4 d-flex">
                  <div className="col" onClick={() => deleteTask(task)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
                <div className="col-5">
                  {year}-{month}-{day}
                </div>
                <div className="col-3">
                  {task.isDone ? (
                    <span style={{ color: "#2ECC71" }}>انتهت</span>
                  ) : (
                    <span style={{ color: "#E74C3C " }}>لم تنتهي</span>
                  )}
                </div>
              </div>
              <div className="col-12 task-title text-center p-2">
                {task.description}
              </div>
              <div className="col-12 task-body text-end">
                <ol>
                  {task.users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                  ))}
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
