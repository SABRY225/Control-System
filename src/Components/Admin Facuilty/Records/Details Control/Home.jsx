import React, { useEffect, useState } from 'react'
import { ControlMaterials, ControlMembers, DetailsOfControl, InformationControl, Notes, Tasks,DataControl  } from '../../index' 
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function HomeControlRecodes() {
  const tok = useSelector((state) => state.auth.token);
  const IdControl = useSelector((state) => state.Profile.IdControlRecord);
  // State to store the fetched data
  const [dataControl, setDataControl] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API using axios
        const response = await axios.get(`http://localhost:5120/Controls/detail/${IdControl}`,
        {
            headers: {
                Authorization: "Bearer " + tok, // Authorization token
                "Content-Type": "application/json", // Content type
            },
        });
        // Set the fetched data
        setDataControl(response.data);

      } catch (error) {
        console.log(error);
      } 
    };

    // Call the fetchData function
    fetchData();
  },[]);
  return (
    <>
      <DetailsOfControl dataControl={dataControl}  />
      <ControlMaterials />
      <ControlMembers />
      <Tasks />
      <Notes /> 
    </>
  )
}

