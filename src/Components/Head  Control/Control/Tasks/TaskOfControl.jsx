import React, { useCallback, useEffect, useState } from "react";
import "../../StyleHeadofControl.css";
import Subtract from "../../../../assets/Subtract.png";
import Trash from "../../../../assets/Trash.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faChevronDown,
  faPaperPlane,
  faTrash,
  faEdit,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { subjects } from "../../../Admin Facuilty/Manage Control/Create Control/subjects";
import { useDispatch, useSelector } from "react-redux";
import {
  addControl,
  addSelectedSubject,
  removeSelectedSubject,
  clearSelectedSubjects,
} from "../../../../Redux/controlSlice";
import EditeTask from "./EditeTask";
import { Link } from "react-router-dom";
import axios from "axios";
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
    selectedSubject: {},
    selectedUsers: {},
  });
  const [selectUsers, setSelectUsers] = useState([]);
  const [selectSubjects, setSelectSubjects] = useState([]);

  const [Edite, setEdite] = useState(false);

  const [controlMembers, setControlsMember] = useState([]);
  const [controlSubjects, setControlsSubject] = useState([]);
  const [tasks, setTasks] = useState([]);

  const getControlMember = useCallback(() => {
    const getControlMember = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5120/users/user-for-control?controlId=" +
            control.control.id,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setControlsMember(data);
        //   console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getControlMember();
  }, []);

  const getControlSubject = useCallback(() => {
    const getControlSubject = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5120/Subject/subjects-of-control?controld=" +
            control.control.id,
          {
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
    getControlSubject();
  }, []);

  const getTasks = useCallback(() => {
    const getTasks = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5120/controlTask/get-tasks-by-control-id?Cid=" +
            control.control.id,
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
    getTasks();
  }, []);

  useEffect(() => {
    getControlMember();
    getControlSubject();
    getTasks();
  }, [getControlMember, getTasks, getControlSubject]);

  const handleAddMember = () => {
    const { selectedUsers } = controlDetails;
    if (selectedUsers) {
      const user = controlMembers.find((e) => e.user.id == selectedUsers);
      const isUserAlreadySelected = selectUsers.includes(user);
      if (!isUserAlreadySelected) {
        setSelectUsers((prev) => [...prev, user]);
        // dispatch(addSelectedSubject(selectedUsers));
        setControlDetails((prevDetails) => ({
          ...prevDetails,
          selectedUsers: "",
        }));
      } else {
        alert("This subject is already added.");
      }
    }
  };
  const handleAddSubject = () => {
    const { selectedSubject } = controlDetails;
    if (selectedSubject) {
      const subject = controlSubjects.find((e) => e.id == selectedSubject);
      console.log(subject);
      const isSubjectAlreadySelected = selectSubjects.includes(subject);
      console.log(isSubjectAlreadySelected);
      if (!isSubjectAlreadySelected) {
        setSelectSubjects((prev) => [...prev, subject]);
        setControlDetails((prevDetails) => ({
          ...prevDetails,
          selectedSubject: "",
        }));
      } else {
        alert("This subject is already added.");
      }
    }
  };
  const handleRemoveUser = (userToRemove) => {
    setSelectUsers((prevUsers) =>
      prevUsers.filter((user) => user !== userToRemove)
    );
  };
  const handleRemoveSubject = (subjectToRemove) => {
    setSelectSubjects((prevSubject) =>
      prevSubject.filter((subject) => subject !== subjectToRemove)
    );
  };
  const onSendTask = async (event) => {
    event.preventDefault();
    let description = "";
    let userTaskIds = [];
    for (const subject of selectSubjects) {
      description += "-" + subject.name;
    }
    for (const user of selectUsers) {
      userTaskIds.push(user.user.id);
    }
    description = description.slice(1);

    try {
      const { data } = await axios.post(
        "http://localhost:5120/controlTask/create-task?Cid=" +
          control.control.id,
        JSON.stringify({ description, userTaskIds }),
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Task created successfully");
      // console.log(data);
      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteTask = async ({ id }) => {
    console.log(id);
    try {
      const { data } = await axios.delete(
        "http://localhost:5120/controlTask/delete-task?Tid=" + id,
        {
          headers: {
            Authorization: "Bearer " + tok,
          },
        }
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      alert("Task deleted successfully");
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="row text-end m-3">
        <div className="col-12 Title-Task ">اضافه مهام أعضاء الكنترول</div>
      </div>
      <form action="#" onSubmit={onSendTask}>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="col">
              <div className="d-flex justify-content-center mb-3">
                <select
                  className="form-select"
                  style={{
                    backgroundColor: "#CFEEFF",
                    color: "black",
                    width: "35%",
                  }}
                  onChange={(e) => {
                    setControlDetails({
                      ...controlDetails,
                      selectedUsers: e.target.value,
                    });
                  }}
                  value={controlDetails.selectedUsers}
                >
                  <option value="#">
                    الأعضاء
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ color: "gray" }}
                    />
                  </option>
                  {controlMembers.map((member) => {
                    // console.log(member);
                    if (member.jobType === "Member")
                      return (
                        <option key={member.user.id} value={member.user.id}>
                          {member.user.name}
                        </option>
                      );
                  })}
                </select>
                <button
                  className="btn mx-3 "
                  onClick={() => handleAddMember(controlDetails.selectedUsers)}
                  type="button"
                  style={{ backgroundColor: "#43BBFF", color: "white" }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div
                className="rectangle-container fs-5 rounded-2"
                style={{ backgroundColor: "#EBF8FF" }}
              >
                <h5 className="mx-3 pt-2">أعضاء الكنترول</h5>
                <div className="row justify-content-center align-items-center">
                  {selectUsers.map((user) => {
                    // console.log(user);
                    return (
                      <div
                        key={user.user.id}
                        className="subject-row col-10 rounded-2 mx-3 my-2"
                        style={{ backgroundColor: "#D9D9D9", color: "black" }}
                      >
                        <span>{user.user.name}</span>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          style={{
                            color: "#FF0000",
                            cursor: "pointer",
                            marginRight: "10px",
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
          <div className="col-md-1 text-center toTask">
            <div>To</div>
          </div>
          <div className="col-md-4">
            <div className="col">
              <div className="d-flex justify-content-center mb-3">
                <select
                  className="form-select"
                  style={{
                    backgroundColor: "#CFEEFF",
                    color: "black",
                    width: "35%",
                  }}
                  onChange={(e) =>
                    setControlDetails({
                      ...controlDetails,
                      selectedSubject: e.target.value,
                    })
                  }
                  value={controlDetails.selectedSubject}
                >
                  <option value="">
                    المواد{" "}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ color: "gray" }}
                    />
                  </option>
                  {controlSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                {/* Add button */}
                <button
                  className="btn mx-3"
                  onClick={() =>
                    handleAddSubject(controlDetails.selectedSubject)
                  }
                  style={{ backgroundColor: "#43BBFF", color: "white" }}
                  type="button"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div
                className="rectangle-container fs-5 rounded-2"
                style={{ backgroundColor: "#EBF8FF" }}
              >
                <h5 className="mx-3 pt-2">المواد </h5>
                <div className="row justify-content-center align-items-center">
                  {selectSubjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="subject-row col-md-5 rounded-2 mx-3 my-2"
                      style={{ backgroundColor: "#D9D9D9", color: "black" }}
                    >
                      <span>{subject.name}</span>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{
                          color: "#FF0000",
                          cursor: "pointer",
                          marginRight: "10px",
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
          <div className="col-12 Title-Task "> مهام أعضاء الكنترول</div>
        </div>
      </div>

      <div className="row justify-content-center">
        {/* Start */}
        {tasks.map((task) => {
          let dateObj = new Date(task.creationDate);
          // Extract year, month, and day from the date object
          let year = dateObj.getFullYear();
          let month = dateObj.getMonth() + 1; // Months are zero-indexed, so add 1
          let day = dateObj.getDate();

          return (
            <div className="col-md-3 task m-2">
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
                  {task.isDone ? "انتهت" : "لم انتهت"}
                </div>
              </div>
              <div className="col-12 task-title text-center p-2">
                {task.description}
              </div>
              <div className="col-12 task-body text-end">
                <ol type="">
                  {task.users.map((user) => {
                    return <li>{user.name}</li>;
                  })}
                </ol>
              </div>
            </div>
          );
        })}
        {/* End */}
      </div>
    </>
  );
}
