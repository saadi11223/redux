// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Register from './Component/Register';
// import Logout from './Component/Logout';
// import Login from './Component/Login';
// import Home from './Component/Home';
// import Crud from './Component/Crud';
// import View from './Component/View';
// import Edit from './Component/Edit';
// import Header from './Component/Header';
// import Forgetpasssword from './Component/Forgetpasssword';
// import Resetpassword from './Component/Resetpassword';
// import Emailverify from './Component/Emailverify';
// import VerifiedEmail from './Component/VerifiedEmail';
// // import Delete from './Component/Delete';
// const theme = createTheme();

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Routes>
//       <Route path='/' element={<Header/>}/>
//         <Route path="/register" element={<Register />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/crud" element={<Crud />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/view/:id" element={<View />} />
//         <Route path="/edit/:id" element={<Edit />} />
//         <Route path='/forget' element={<Forgetpasssword/>}/>
//         <Route path='/reset-password' element={<Resetpassword/>}/>
//         <Route path='/send-verification-email' element={<Emailverify/>}/>
//         <Route path='/verify-email' element={<VerifiedEmail/>}/>
        
//         {/* <Route path='/home' element={<Logout/>}></Route> */}
        
//         {/* <Route path="/delete/:id" element={<Delete/>} /> */}
//               </Routes>
//     </ThemeProvider>
//   );
// }
// export default App;

// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './Component/Home';
import View from './Component/View';
import Emailverify from './Component/Emailverify';
import Edit from './Component/Edit';
import VerifiedEmail from './Component/VerifiedEmail';
// import Login from './components/Login';
// import VerifiedEmail from './Component/VerifiedEmail';
import Login from './Component/Login';
import PrivateRoute from './components/PrivateRoute';
// import Home from './components/Home';

import Crud from './Component/Crud';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
        
          <Route path="/login" element={<Login />} />
          <Route path='/verify-email' element={<VerifiedEmail/>}/>
          <Route path='/send-verification-email' element={<Emailverify/>}/>
          {/* <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          /> */}
 <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/view/:id" element={<View />} />
//         <Route path="/edit/:id" element={<Edit />} />
{/* <Route path='/verify-email' element={<VerifiedEmail/>}/> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
