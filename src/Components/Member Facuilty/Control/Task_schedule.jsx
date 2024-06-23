import React, { useCallback, useEffect, useState } from "react";
import "../Style.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Task_schedule() {
  const [Tasks, setTasks] = useState([]);
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);

  const getControlTask = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_GETTASKSBYCONTROLID}${control.control.id}`,
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error.message);
    }
  }, [control.control.id, tok]);

  useEffect(() => {
    getControlTask();
  }, [getControlTask]);

  const DoneTask = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_STATUSOFTASK}${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      getControlTask();
    } catch (error) {
      console.error("Failed to update task status:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row m-2">
        <div className="Title-Task text-end">المهام</div>
      </div>
      <div className="row justify-content-center">
        {Tasks.map((task) => (
          <div key={task.id} className="col-md-3 task m-2">
            <div className="col-12 d-flex justify-content-between align-items-center task-head p-2 text-center" style={{height: "7vh"}}>
              {!task.isDone && (
                <button
                  className="Done"
                  type="button"
                  onClick={() => DoneTask(task.id)}
                >
                  تم
                </button>
              )}
              <div>
                {task.isDone ? (
                  <span style={{color: "#2ECC71"}}>انتهت</span>
                ) : (
                  <span style={{color: "#E74C3C"}}>لم تنتهي</span>
                )}
              </div>
            </div>
            <div className="col-12 task-title text-center p-2">
              {task.description}
            </div>
            <div className="col-md-12">
              {task.users.map((user) => (
                <div key={user.id} className="col MemberDataTask">
                  {user.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
