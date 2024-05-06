import React, { useEffect, useState } from 'react'
import "./styleControls.css"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
export default function InformationControl() {
  const tok = useSelector((state) => state.auth.token);
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get('http://localhost:5120/Controls/allControllers', {
        headers: {
            'Authorization': 'Bearer ' + tok
        }
    });
    setData(data);
};
useEffect(() => {
    getData();
}, []);
console.log(data[0]);
  return (
    <div className='container HomeClassInfoControls'>
      {/* Semes_Acad_Title */}
      <div className='row  Semes_Acad_Title m-2'>
        <div className="col-5  text-end Semes_Acad_Title-col">2024/2023</div>
        <div className="col-2   Semes_Acad_Title-col">-</div>
        <div className="col-5   text-start Semes_Acad_Title-col">semester 2</div>
      </div>
      {/* Semes_Acad_Title */}
      <div className='container ClassesControls'>
        <div className='row justify-content-center'>
          {/* Start  */}
          <div class="col-4 m-3 boxControl ">
            <div className="row">
              <div className="col-6 dataofControl">
                <div className='nameOfHeadControl'>د/ محمد عبدالرازق</div>
                <div className="nameOfJob">رئيس الكنترول</div>
              </div>
              <div className="col-6 text-center nameOfControl">
                <div >المستوي الأول</div>
              </div>
            </div>
          </div>
          {/* End  */}
          {/* Start  */}
          <div class="col-4 m-3 boxControl ">
            <div className="row">
              <div className="col-6 dataofControl">
                <div className='nameOfHeadControl'>د/ محمد عبدالرازق</div>
                <div className="nameOfJob">رئيس الكنترول</div>
              </div>
              <div className="col-6 text-center nameOfControl">
                <div >المستوي الأول</div>
              </div>
            </div>
          </div>
          {/* End  */}
          {/* Start  */}
          <div class="col-4 m-3 boxControl ">
            <div className="row">
              <div className="col-6 dataofControl">
                <div className='nameOfHeadControl'>د/ محمد عبدالرازق</div>
                <div className="nameOfJob">رئيس الكنترول</div>
              </div>
              <div className="col-6 text-center nameOfControl">
                <div >المستوي الأول</div>
              </div>
            </div>
          </div>
          {/* End  */}
        </div>

      </div>

    </div>
  )
}

