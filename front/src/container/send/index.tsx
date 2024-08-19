import './index.css';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from '../../component/statusBar';
import Nav from '../../component/navBar';
// import Button from '../../component/button';
import Footer from '../../component/footer';
import Input from '../../component/input';

const Send = () => {
  const [amount, setAmount] = useState<string>('')
  const [emailTo, setEmailTo ] = useState<string>('') 
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || { email: '' };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value
    setEmailTo(emailValue)
  }

  const handleSend = async () => {
    if (amount === "") {
      throw('error')
    }
    
    try {
      const res = await fetch('http://localhost:4000/wallet/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, email, to: emailTo })
      });

      if (res.ok) {
        navigate('/main', { state: { email: email }});       
      } else {
        console.log( 'res is not ok ')
      }
    } catch (error) {
      console.log('Error during sign up:', error)
    }
  }

  return (
    <div className='receive-container container'>
      
      <Header color={'black'}/>
      <Nav />

      <p className="send-title"> Send </p>

      <div className="content receive-content">
        <Input 
          label={'Email'}
          placeholder={'Email here'} 
          name={'email'}
          id={'emailId'}
          type={'email'}
          value={emailTo}
          onChange={handleEmail}
        />

        <Input 
          label={'Sum'}
          placeholder={'$ 00.00'}
          name={'sum'}
          id={'sumId'}
          type={'text'}
          value={amount}
          onChange={handleAmountChange}
        />

        {/* <Button primary={true} onClick={() => handleSend} type={'button'}>
          <p className='button-text' >Send</p>
        </Button> */}

        <div className="buttonDiv" onClick={handleSend}>
          <p className="buttonDiv-title"> Send </p>
        </div>
      </div>

      <Footer />
      
    </div>
  );
};

export default Send;
