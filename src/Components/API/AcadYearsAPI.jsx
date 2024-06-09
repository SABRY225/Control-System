// AcadYearsAPI.js
import axios from 'axios';

export const getAllAcadYears = async (token) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_GETALLACADYEARS, {
      headers: {
        Authorization: 'Bearer ' + token, // Authorization token
        'Content-Type': 'application/json', // Content type
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching academic years:', error);
    throw new Error('Error fetching academic years: ' + error.message);
  }
};
