import React, { useState } from 'react';
import './index.css';
import { useNavigate } from "react-router-dom";

import Header from '../../component/statusBar';
import Nav from '../../component/navBar';
import Input from '../../component/input';
import Button from '../../component/button';
import Footer from '../../component/footer';

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; password?: string, exist?: string }>({});
  const [password, setPassword] = useState<string>('');

  const emailList = ['asd@asd.asd']
  const navigate = useNavigate()
  
  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
     
  }; // checking by regex, then return :BOOLEAN 

  const emailsComparing = (email: string): boolean => {
    return emailList.includes(email);
  };

  const validatePassword = (password: string): boolean => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasCapitalLetter && isLongEnough;
  }; // checking capital letter and length, then return :BOOLEAN 


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { email?: string; password?: string, exist?: string } = {}

    if (!validateEmail(email)) {
      newErrors.email = "It`s not an email"
    }

    if (emailsComparing(email)) {
      newErrors.exist = "A user with the same name is already exist"
    }

    if (!validatePassword(password)) {
      newErrors.password = "Sorry, the password is too simple.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      
      try {
        const res = await fetch('http://localhost:4000/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        if (res.ok) {
          navigate('/signup-confirm', { state: { email } });        
        }
      } catch (error) {
        console.error('Error during sign up:', error)
      }
    }
  }

  return (
    <div className='container'>
      <Header color={'black'}/>
      <Nav /> 
      
      <div className="content">
          <div className="content-wrapper">
              <div className="content-wrapper">
                <div className="title-wrapper">
                  <h3 className="title"> Sign Up </h3>
                  <p className="description"> Choose a registration method </p>
                </div>
              
                <div className="form-wrapper">
                  <form onSubmit={handleSignUp}>
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

                    <br />

                    <Input
                      label={'Password'}
                      placeholder={'Password here'}
                      name={'psw'}
                      id={'pswInput'}
                      type={'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={errors.password}
                    />

                    {errors.password && (
                      <p className="error-password__active">{errors.password}</p>
                    )}
                
                    <p className="haveAccount"> Already have an account? <a href="/signIn" className="signIn"> Sign In </a></p>
                  
                    <Button primary={true} type={'submit'}>
                      <p className='button-text'> Continue </p>
                    </Button>

                    {errors.exist && (
                      <div className="error-wrapper">
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.83333 11.9507C1.83333 11.5458 1.93652 11.1476 2.13316 10.7936L6.2571 3.37054C6.62266 2.71254 7.2587 2.24826 7.99681 2.10064V2.10064C8.32898 2.0342 8.67101 2.0342 9.00318 2.10064V2.10064C9.74129 2.24826 10.3773 2.71254 10.7429 3.37054L14.8668 10.7936C15.0635 11.1476 15.1667 11.5458 15.1667 11.9507V11.9507C15.1667 13.2666 14.0999 14.3333 12.7841 14.3333H4.21593C2.90005 14.3333 1.83333 13.2666 1.83333 11.9507V11.9507Z" stroke="#F2883D" strokeWidth="1.5"/>
                          <path d="M8.5 5.99996L8.5 8.66663" stroke="#F2883D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.5 10.6667L8.5 11" stroke="#F2883D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <p className='emailExist'>
                          {errors.exist} 
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
          </div>
      </div>

      <Footer />
      
    </div>
  );
};

export default SignUp;
