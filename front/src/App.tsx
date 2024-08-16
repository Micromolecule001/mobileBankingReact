import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPage from './container/mainPage';
import SignIn from './container/signIn';
import Recovery from './container/recovery';
import SignUp from './container/signUp';
import SignUpConfirm from './container/signUpConfirm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-confirm" element={<SignUpConfirm />} />
      </Routes>
    </Router>
  );
};

export default App;
