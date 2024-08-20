import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import './index.css';

import Header from '../../component/statusBar';
import Nav from '../../component/navBar';
import Input from '../../component/input';
import Button from '../../component/button';
import Footer from '../../component/footer';

const RecoveryConfirm = () => {
  const [code, setCode] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errors, setErrors] = useState<{ code?: string; password?: string }>({});

  const navigate = useNavigate()
  const location = useLocation();
  const { email } = location.state || { email: ''}
  
  const validatePassword = (password: string): boolean => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasCapitalLetter && isLongEnough;
  }; // checking capital letter and length, then return :BOOLEAN 

  const handleCodeInput = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { email?: string; password?: string, exist?: string } = {}

    if (!validatePassword(password)) {
      newErrors.password = "Sorry, the password is too simple.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});

      try {
        const res = await fetch('http://localhost:4000/auth/recovery-confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code })
        });
        
        const result = await res.json()

        if (res.ok) {
          navigate('/main', { state: { email } });       
        } else {
          setErrors({ code: result.message });
        }
      } catch (error) {
        console.error('Error during sign up:', error)
      }
    };
  }
  
  return (
    <div className='container'>
      <Header color={'black'}/>
      <Nav /> 
      
      <div className="content">
          <div className="content-wrapper">
              <div className="content-wrapper">
                <div className="title-wrapper">
                  <h3 className="title"> Recover password </h3>
                  <p className="description"> Write the code you received </p>
                </div>
              
                <div className="form-wrapper">
                  <form onSubmit={handleCodeInput}>
                    <Input
                      label={'Code'}
                      placeholder={'Code'}
                      name={'code'}
                      id={'codeInput'}
                      type={'text'}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      error={errors.code}
                    />

                    {errors.code && (
                      <p className="error-password__active">{errors.code}</p>
                    )}

                    <br />

                    <Input
                      label={'New password'}
                      placeholder={'Create new password'}
                      name={'password'}
                      id={'passwordInput'}
                      type={'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={errors.password}
                    />

                    {errors.password && (
                      <p className="error-password__active">{errors.password}</p>
                    )}

                    <Button id={'sendCode'} primary={true} type={'submit'}>
                      <p className='button-text'> Send code </p>
                    </Button>
                  </form>
                </div>
              </div>
          </div>
      </div>

      <Footer />
      
    </div>
  );
};

export default RecoveryConfirm;
