import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//auth
import MainPage from './container/mainPage';
import SignIn from './container/signIn';
import Recovery from './container/recovery';
import RecoveryConfirm from './container/recovery-confirm';
import SignUp from './container/signUp';
import SignUpConfirm from './container/signUpConfirm';

//wallet
import Wallet from './container/mainWallet';
import PaymentInfo from './container/paymentInfo';
import Receive from './container/receive';  
import Send from './container/send';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/recovery-confirm" element={<RecoveryConfirm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-confirm" element={<SignUpConfirm />} />

          <Route path="/main" element={<Wallet />} />
          <Route path="/payment-info" element={<PaymentInfo />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/send" element={<Send />} />
      </Routes>
    </Router>
  );
};

export default App;
