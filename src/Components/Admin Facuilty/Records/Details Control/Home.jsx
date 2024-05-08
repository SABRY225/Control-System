import React, { useEffect, useState } from 'react';
import { ControlMaterials, ControlMembers, DetailsOfControl, Notes, Tasks } from '../../index';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
        const response = await axios.get(`http://localhost:5120/Controls/detail/${IdControl}`, {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        });
        setDataControl(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataSubject = async () => {
      try {
        const response = await axios.get('http://localhost:5120/Subject/subjects-of-control', {
          params: { Controld: IdControl },
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
        const response = await axios.get('http://localhost:5120/Users/user-for-control', {
          params: { Controld: IdControl },
          headers: {
            Authorization: "Bearer " + tok,
          },
        });
        setDataMember(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:5120/ControlNotes/control/${IdControl}`, {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        });
        setDataNotes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDataTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5120/ControlTask/get-tasks-by-control-id', {
          params: { Cid: IdControl },
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        });
        setDataTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchDataSubject();
    // fetchDataMemeber();
    fetchDataNotes()
    fetchDataTasks()
  }, [IdControl, tok]);

  console.log(dataControl.name);
  console.log(dataSubject);
  console.log(dataMember);

  return (
    <>
      <DetailsOfControl dataControl={dataControl} />
      <ControlMaterials dataSubject={dataSubject} />
      {/* <ControlMembers dataMember={dataMember} /> */}
      <Tasks dataTasks={dataTasks} />
      <Notes dataNotes={dataNotes} />
    </>
  );
}
