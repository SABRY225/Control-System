import React, { useEffect, useState } from 'react';
import { ControlMaterials, ControlMembers, DetailsOfControl, Notes, Tasks } from '../../../constant/Path';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

export default function HomeControlRecodes() {
  const tok = useSelector((state) => state.auth.token);
  const IdControl = useSelector((state) => state.Profile.IdControlRecord);
  console.log(IdControl);
  const [dataControl, setDataControl] = useState({});
  const [dataSubject, setDataSubject] = useState([]);
  const [dataMember, setDataMember] = useState([]);
  const [dataNotes, setDataNotes] = useState([]);
  const [dataTasks, setDataTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_DETAILSCONTROL}${IdControl}`, {
          headers: {
            Authorization: "Bearer " + tok,
          },
        });
        setDataControl(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataSubject = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_SUBJECTSOFCONTROL, {
          params: { Cid: IdControl },
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        });
        setDataSubject(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataMemeber = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_GETUSERSFORCONTROL,
          {
            params: { controlId: IdControl },
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setDataMember(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataNotes = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_GETALLNOTES + IdControl, {
          headers: {
            Authorization: "Bearer " + tok,
          },
        });
        setDataNotes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDataTasks = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_GETTASKSBYCONTROLID + IdControl, {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        });
        setDataTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchDataSubject();
    fetchDataMemeber();
    fetchDataNotes();
    fetchDataTasks();
  }, [IdControl, tok]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <DetailsOfControl dataControl={dataControl} />
      <ControlMaterials dataSubject={dataSubject} />
      <ControlMembers dataMember={dataMember} />
      <Tasks dataTasks={dataTasks} />
      <Notes dataNotes={dataNotes} />
      <div className="text-center my-4">
        <button className="btn btn-primary btn-print" onClick={handlePrint}>Print Page <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon></button>
      </div>
    </>
  );
}
