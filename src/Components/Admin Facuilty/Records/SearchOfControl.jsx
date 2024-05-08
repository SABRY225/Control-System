import React, { useEffect, useState } from 'react'
import "./Style.css"
import view from "../../../assets/view.png"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setIdControlRecord } from '../../../Redux/ProfileSlice';
import { useNavigate } from 'react-router-dom';


export default function SearchOfControl() {
    const tok = useSelector((state) => state.auth.token);
    const [acad_Year, setAcad_Year] = useState("");
    const [originalData, setOriginalData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5120/Controls/acadmec-year',
                {
                    params: { AY: acad_Year },
                    headers: {
                        Authorization: "Bearer " + tok, // Authorization token
                        "Content-Type": "application/json", // Content type
                    },
                });
            if (!response.statusText) {
                throw new Error('Failed to fetch data');
            }
            console.log(response);
            setOriginalData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log(originalData);
    const buttonStyles = {
        width: '15vw',
        height: '40px',
        backgroundColor: '#03a9f4',
        color: '#fff',
        borderRadius: '11px',
        boxShadow: '0px 0px 5px #b1b1b1, -3px -3px 3px #fff',
        letterSpacing: '1.3px',
        margin: 'auto',
        border: 'none',
        outline: 'none',
    };
    const headelPageRecord =(control)=>{
        dispatch(setIdControlRecord(control))
        navigate('/Admin_Facuilty/Records/control')

    }
    return (
        <>
            <div className='Search container'>
                <div className='row TextTitle'>
                    <div className="col-md-12"> البحث عن لجنة كنترول</div>
                </div>
                <div className='SearchBar row text-center '>
                    <div className="col-md">
                        <select name="Acad_Year" id="Input_Select"
                            style={{
                                backgroundColor: '#E1E1E1',
                                color: 'black',
                                width: '40vw',
                            }}
                            value={acad_Year}
                            onChange={(e) => setAcad_Year(e.target.value)}
                        >
                            <option defulat value=" ">العام الأكاديمي</option>
                            <option value="2023/2024">2023/2024</option>
                            <option value="2024/2025">2024/2025</option>
                            <option value="2025/2026">2025/2026</option>
                            <option value="2026/2027">2026/2027</option>
                            <option value="2027/2028">2027/2028</option>
                            <option value="2028/2029">2028/2029</option>
                            <option value="2029/2030">2029/2030</option>
                            <option value="2031/2032">2031/2032</option>
                        </select>
                    </div>
                    <div className="col-md">
                        <button type="submit" className='mt-3' onClick={handleSearch}
                            style={buttonStyles}>البحث</button>
                    </div>
                </div>
                <div className='ResultOfSearch m-5'>
                    {originalData.length == 0 ? (
                        <div className="col-md-12 my-3">
                            <p className="text-center fs-2 fw-bold">لا يوجد لجان كنترول   </p>
                        </div>
                    ) : (
                        <div className="row justify-content-center text-center years-of-controls">
                            {/* Displaying Controls */}
                            {originalData.map((control) => (
                                <div key={control.id} className="col-md-5" onClick={()=>headelPageRecord(control.id)}>
                                    <div
                                        className="d-flex flex-column justify-content-center  rounded-2 mt-4 p-3 border border-3 control-card"
                                        // 
                                    >
                                        <div className="d-flex ">
                                            <h5 className='col-8'>{control.name}</h5>
                                            <h5 className='col-4'>{control.faculity_Semester}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>)}
                </div>
            </div>
        </>
    )
}