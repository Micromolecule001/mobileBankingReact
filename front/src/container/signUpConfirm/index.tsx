import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

import Header from '../../component/statusBar';
import Nav from '../../component/navBar';
import Input from '../../component/input';
import Button from '../../component/button';
import Footer from '../../component/footer';

const SignUpConfirm = () => {
  const [code, setCode] = useState<string>("")
  const [errors, setErrors] = useState<{ code?: string }>({});
  
  const navigate = useNavigate()
  const location = useLocation();
  const { email } = location.state || { email: ''}

  const handleCodeInput = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:4000/auth/signup-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, code: code }),
    });

    const result = await res.json(); //  back end sending me the error

    if (res.ok) {
      navigate('/main', { state: { email } });;
    } else {
        // Handle error (e.g., set errors)
        setErrors({ code: result.message });
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
                  <h3 className="title"> Confirm account </h3>
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

                    <Button id={'confirm'} primary={true} type={'submit'}>
                      <p className='button-text'> Confirm </p>
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

export default SignUpConfirm;
