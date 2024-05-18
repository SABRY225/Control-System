import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import InfoControl from './InfoControl';
import AnalysisOfControl from './AnalysisOfControl';
import TaskOfControl from './Tasks/TaskOfControl';

export default function ContentOfControl() {
    const [isControlActive, setIsControlActive] = useState(true);
    const [isAnalysisActive, setIsAnalysisActive] = useState(false);
    const [isTaskActive, setIsTaskActive] = useState(false);

    const [showanalysis, setShowanalysis] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [showControl, setShowControl] = useState(true);

    const handelAnalaysisClick = () => {
        setIsAnalysisActive(true);
        setIsControlActive(false);
        setIsTaskActive(false);

        setShowanalysis(true);
        setShowTask(false);
        setShowControl(false);

    };
    const handelControlClick = () => {
        setIsAnalysisActive(false);
        setIsControlActive(true);
        setIsTaskActive(false);

        setShowanalysis(false);
        setShowTask(false);
        setShowControl(true);

    };
    const handelTaskClick = () => {
        setIsAnalysisActive(false);
        setIsControlActive(false);
        setIsTaskActive(true);

        setShowanalysis(false);
        setShowTask(true);
        setShowControl(false);

    };
    return (
        <>
            <div className="container text-center ">
                <div className=" d-flex justify-content-center pt-2 pl-2 ">
                    <div className="col-auth m-2 ">
                        <button
                            className="btn mx-3"
                            style={{
                                backgroundColor: isTaskActive ? '#43BBFF' : '#98DAFF',
                                color: isTaskActive ? 'white' : 'black',
                                boxShadow: isTaskActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                            }}
                            onClick={
                                handelTaskClick
                            }
                        >
                            المهام
                        </button>
                    </div>
                    <div className="col-auth m-2 ">
                        <button
                            className="btn mx-3"
                            style={{
                                backgroundColor: isAnalysisActive ? '#43BBFF' : '#98DAFF',
                                color: isAnalysisActive ? 'white' : 'black',
                                boxShadow: isAnalysisActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                            }}
                            onClick={
                                handelAnalaysisClick
                            }
                        >
                            الاحصائيات
                        </button>
                    </div>
                    <div className="col-auth  m-2">
                        <button
                            className="btn mx-3"
                            style={{
                                backgroundColor: isControlActive ? '#43BBFF' : '#98DAFF',
                                color: isControlActive ? 'white' : 'black',
                                boxShadow: isControlActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                            }}
                            onClick={
                                handelControlClick
                            }
                        >
                            الكنترول
                        </button>
                    </div>
                </div>
                {showControl && <InfoControl />}
                {showanalysis && <AnalysisOfControl />}
                {showTask && <TaskOfControl />}
            </div>
        </>
    )
}

