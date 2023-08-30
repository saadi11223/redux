// src/services/authService.js
import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/v1/auth'; // Replace with your API base URL

const authService = {
  login: async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/v1/auth/login', {
          email: email,
          password: password,
        
        });
        const data = response.data;
        
        localStorage.setItem('user', JSON.stringify(data));
        // console.log('response', response);
        console("success")
        // navigate('/crud');
      } catch (error) {
        console.log(error.response);
        // Handle error or display error message to the user
      }
    }
};
//   logout: async () => {
//     try {
//       await axios.post(`${API_BASE_URL}/logout`);
//     } catch (error) {
//       throw error;
//     }
//   },
// };

export default authService;
