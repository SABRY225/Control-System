import React, { useCallback, useEffect, useState } from "react";
import "../Style.css";
import axios from "axios";
import { useSelector } from "react-redux";
export default function Task_schedule() {
  const [Tasks, setTasks] = useState([]);
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);
  const getControlTask = useCallback(() => {
    const getControlTask = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_TASKSOFCONTROL,
          {
            params:{Cid:control.control.id},
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setTasks(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getControlTask();
  }, []);

  useEffect(() => {
    getControlTask();
  }, [getControlTask]);

  const DoneTask = async ({ id }) => {
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_TASKSOFCONTROLISDONE,
        {},
        {
          params:{Tid:id},
          headers: {
            Authorization: "Bearer " + tok,
          },
        }
      );
      // console.log(data);
      getControlTask();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row m-2">
          <div className="Title-Task ">المهام</div>
        </div>
        <div className="row justify-content-center">
          {/* Start */}
          {Tasks.map((task) => {
            return (
              <div key={task.id} className="col-md-3 task m-2">
                <div className="col-12 d-flex justify-content-between align-items-center task-head p-2 text-center">
                  {!task.isDone && (
                    <button
                      className="Done"
                      type="button"
                      onClick={() => DoneTask(task)}
                    >
                      Done
                    </button>
                  )}
                  <div>{task.isDone > 0 ? "انتهت" : "لم تنتهي"}</div>
                </div>
                <div className="col-12 task-title text-center p-2">
                  {task.description}
                </div>
                <div className="col-md-12 ">
                  {task.users.map((user) => {
                    return (
                      <div className="col MemberDataTask">{user.name}</div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {/* End */}
        </div>
      </div>
    </>
  );
}
