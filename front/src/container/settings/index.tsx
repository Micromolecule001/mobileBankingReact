import './index.css';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from '../../component/statusBar';
import Nav from '../../component/navBar';
import Button from '../../component/button';
import Footer from '../../component/footer';
import Input from '../../component/input';

const Settings = () => {
  const [passwordNew, setPasswordNew] = useState<string>('')
  const [passwordOld, setPasswordOld] = useState<string>('')
  const [passwordOldEmail, setPasswordOldEmail] = useState<string>('')
  const [emailNew, setEmailNew ] = useState<string>('') 
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || { email: '' };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordNew(e.target.value);
  };

  const handlePasswordOldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordOld(e.target.value);
  };

  const handlePasswordOldEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordOldEmail(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value
    setEmailNew(emailValue)
  }

  const handleSettings = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    
    if (id === 'changeEmail') {
      try {
        const res = await fetch('http://localhost:4000/wallet/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, method: { type: id, oldPassword: passwordOldEmail, newEmail: emailNew }})
        });
  
        if (res.ok) {
          navigate('/main', { state: { email: email }});       
        } else {
          console.log( 'res is not ok ')
        }
      } catch (error) {
        console.log('Error during sign up:', error)
      }
    } else if (id === 'changePassword') {
      try {
        const res = await fetch('http://localhost:4000/wallet/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, method: { type: id, newPassword: passwordNew, oldPassword: passwordOld }})
        });
  
        if (res.ok) {
          navigate('/main', { state: { email: email }});       
        } else {
          console.log( 'res is not ok ')
        }
      } catch (error) {
        console.log('Error during sign up:', error)
      }
    } else {
      navigate('/')
    }
  }

  return (
    <div className='settigs-container container'>
      
      <Header color={'black'}/>
      <Nav />

      <p className="settings-title"> Settings </p>

      <div className="content settings-content">
        <div className="content-wrapper__settings">
          <p className="contentP-title" > Change email</p>

          <Input 
            label={'Email'}
            placeholder={'New email'} 
            name={'email'}
            id={'emailId'}
            type={'email'}
            value={emailNew}
            onChange={handleEmail}
          />

          <Input 
            label={'Old password'}
            placeholder={'* * * * * * * *'}
            name={'psw'}
            id={'pswId'}
            type={'password'}
            value={passwordOldEmail}
            onChange={handlePasswordOldEmailChange}
          />

          <Button id={'changeEmail'} primary={false} onClick={handleSettings} type={'button'}>
            <p className='button-text' > Save email </p>
          </Button>
        </div> 

        <div className="divider"></div>

        <div className="content-wrapper__settings">
          <p className="contentP-title" id='changePassword'> Change password </p>

          <Input 
            label={'Old password'}
            placeholder={'* * * * * * * *'}
            name={'psw'}
            id={'pswId'}
            type={'password'}
            value={passwordOld}
            onChange={handlePasswordOldChange}
          />

          <Input 
            label={'New password'}
            placeholder={'* * * * * * * *'}
            name={'psw'}
            id={'pswId'}
            type={'password'}
            value={passwordNew}
            onChange={handlePasswordChange}
          />

          <Button id={'changePassword'} primary={false} onClick={handleSettings} type={'button'}>
            <p className='button-text' >Save password</p>
          </Button>

         
        </div>

        <div className="divider"></div>

        <button className="logOut" id='logOut' onClick={handleSettings}> Log Out </button>
      </div>

      <Footer />
      
    </div>
  );
};

export default Settings;