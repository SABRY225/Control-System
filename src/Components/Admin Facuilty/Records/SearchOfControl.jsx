import React, { useEffect, useState } from 'react';
import './Style.css';
import view from '../../../assets/view.png';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setIdControlRecord } from '../../../Redux/ProfileSlice';
import { useNavigate } from 'react-router-dom';

const SearchOfControl = () => {
  const tok = useSelector((state) => state.auth.token);
  const [acadYear, setAcadYear] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [searching, setSearching] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (searching) {
      handleSearch();
    }
  }, [acadYear, searching]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_GETCONTROLSBYACADEMICYEAR, {
        params: { AcadYear: acadYear },
        headers: {
          Authorization: 'Bearer ' + tok, // Authorization token
          'Content-Type': 'application/json', // Content type
        },
      });
      if (!response.statusText) {
        throw new Error('Failed to fetch data');
      }
      setOriginalData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setSearching(false);
    }
  };
  console.log(originalData);
  const handleViewDetails = (controlId) => {
    dispatch(setIdControlRecord(controlId));
    navigate('/Admin_Faculity/Records/control');
  };

  return (
    <div className="Search container">
      <div className="row TextTitle">
        <div className="col-md-12">البحث عن لجنة كنترول</div>
      </div>
      <div className="SearchBar row text-center">
        <div className="col-md">
          <select
            name="Acad_Year"
            id="Input_Select"
            style={{
              backgroundColor: '#E1E1E1',
              color: 'black',
              width: '40vw',
            }}
            value={acadYear}
            onChange={(e) => {
              setAcadYear(e.target.value);
              setSearching(true);
            }}
          >
            <option value="">العام الأكاديمي</option>
            <option value="2025/2024">2025/2024</option>
            <option value="2024/2023">2024/2023</option>
            <option value="2023/2022">2023/2022</option>
            <option value="2022/2021">2022/2021</option>
            <option value="2021/2020">2021/2020</option>
            <option value="2020/2019">2020/2019</option>
            <option value="2019/2018">2019/2018</option>
            <option value="2018/2017">2018/2017</option>
            <option value="2017/2016">2017/2016</option>
          </select>
        </div>
      </div>
      <div className="ResultOfSearch m-5">
        {originalData.length === 0 ? (
          <div className="col-md-12 my-3">
            <p className="text-center fs-2 fw-bold">لا يوجد لجان كنترول</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>اسم اللجنة</th>
                <th>الفصل الدراسي</th>
                <th> المستوي</th>
              </tr>
            </thead>
            <tbody>
              {originalData.map((control) => (
                <tr key={control.id} onClick={() => handleViewDetails(control.id)}>
                  <td>{control.name}</td>
                  <td>{control.faculity_Semester}</td>
                  <td>{control.faculity_Phase}</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SearchOfControl;