import React, { useState } from 'react';
import './index.css';

import Header from '../../component/statusBar';
import Footer from '../../component/footer';
import Button from '../../component/button';
import Nav from '../../component/navBar';
import Input from '../../component/input';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  
  const validatePassword = (password: string): boolean => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasCapitalLetter && isLongEnough;
  }; // checking capital letter and length, then return :BOOLEAN 

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }; // checking by regex, then return :BOOLEAN 

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault() // ensuring the browser does not refresh the page

    const newErrors: { email?: string; password?: string } = {};

    if (!validatePassword(password)) {
      newErrors.password = "Sorry, the password is too simple.";
    }

    if(!validateEmail(email)) {
      newErrors.email = "It`s not an email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log('Form submitted:', { email, password });
    }

    try {
      const res = await fetch('http://localhost:4000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during sign in:', error)
    }
  };

  return (
    <div className='container'>
      <Header color={'black'} />
      <Nav />

      <div className="content">
        <div className="content-wrapper">
          <div className="title-wrapper">
            <h3 className="title">Sign In</h3>
            <p className="description">Select login method</p>
          </div>

          <div className="form-wrapper">
            <form onSubmit={handleSignIn}>
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

              <p className='restore-p'>Forgot your password? <a href="/recovery">Restore</a></p>

              <Button primary={true} type={'submit'}>
                <p className='button-text'> Continue </p>
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignIn;
