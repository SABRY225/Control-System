import React, { useState } from 'react';
import ControlList from '../Edite Control/Control_List';
import CreationControl from './CreationControl';

const ControlManagement = () => {


    const [isCreateActive, setIsCreateActive] = useState(true);
    const [isEditActive, setIsEditActive] = useState(false);

    const [ShowEdite, setShowEdite] = useState(false); 
    const [showControl, setShowControl] = useState(true); 

    const handelCearteClick = () => {
        setIsCreateActive(true);
        setIsEditActive(false);
        setShowEdite(false);
        setShowControl(true);
    }
    const handelEditeClick =()=>{
        setIsCreateActive(false);
        setIsEditActive(true);
        setShowEdite(true);
        setShowControl(false);
    } 
    return (
        <div className="container mt-4 rtl page">
            <div className="container my-4 rtl">
                <div className="row mb-4 align-items-center justify-content-center">
                    {/* Create Control Button */}
                    <button
                        className="btn m-3 col-lg-3"
                        style={{
                            backgroundColor: isCreateActive ? '#43BBFF' : '#98DAFF',
                            color: isCreateActive ? 'white' : 'black',
                            boxShadow: isCreateActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                        }}
                        onClick={
                            handelCearteClick
                        }
                    >
                        إنشاء كنترول
                    </button>

                    {/* Edit Control Button */}
                    <button
                        className="btn mx-3 col-lg-3"
                        style={{
                            backgroundColor: isEditActive ? '#43BBFF' : '#98DAFF',
                            color: isEditActive ? 'white' : 'black',
                            boxShadow: isEditActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                        }}
                        onClick={handelEditeClick}
                    >
                        تعديل كنترول
                    </button>
                </div>
            </div>
            {/* Control Details Form */}
            {showControl && <CreationControl />}
            {ShowEdite && <ControlList />}
        </div>
    );
};

export default ControlManagement;