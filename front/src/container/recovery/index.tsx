import React, { useState } from 'react';
import './index.css';

import Header from '../../component/statusBar';
import Nav from '../../component/navBar';
import Input from '../../component/input';
import Button from '../../component/button';
import Footer from '../../component/footer';

const Recovery = () => {
  const [email, setEmail] = useState<string>("")
  const [errors, setErrors] = useState<{ email?: string }>({});
  
  const handleCodeInput = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('handle')
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

                    <Button primary={true} type={'submit'}>
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
