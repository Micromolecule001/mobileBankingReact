import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './index.css';

import Header from '../../component/statusBar';
import Nav from '../../component/navBar';
import Input from '../../component/input';
import Button from '../../component/button';
import Footer from '../../component/footer';

const Recovery = () => {
  const [email, setEmail] = useState<string>("")
  const [errors, setErrors] = useState<{ email?: string }>({});
  const navigate = useNavigate()

  const handleCodeInput = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:4000/auth/recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const result = await res.json() 

      if (res.ok) {
        navigate('/recovery-confirm', { state: { email } });        
      } else {
        setErrors({ email: result.message });
      }
    } catch (error) {
      console.error('Error during sign up:', error)
    }
  };

  return (
    <div className='container'>
      <Header color={'black'}/>
      <Nav /> 
      
      <div className="content">
          <div className="content-wrapper">
              <div className="content-wrapper">
                <div className="title-wrapper">
                  <h3 className="title"> Recovery password </h3>
                  <p className="description"> Choose a recovery method </p>
                </div>
              
                <div className="form-wrapper">
                  <form onSubmit={handleCodeInput}>
                    <Input
                      label={'Email'}
                      placeholder={'Email here'}
                      name={'email'}
                      id={'emailInput'}
                      type={'email'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={errors.email}
                    />

                    {errors.email && (
                      <p className="error-password__active">{errors.email}</p>
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

export default Recovery;
