import { useState, type FormEvent, type ChangeEvent } from 'react';

import Auth from '../utils/auth';
import { login, signUp } from '../api/authAPI';
import type { UserSignUp } from '../interfaces/UserSignUp';

const SignUp = () => {
    const [signUpData, setSignUpData] = useState<UserSignUp>({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
        const { name, value } = e.target;
        setSignUpData({
          ...signUpData,
          [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
          await signUp(signUpData);
        
          const data = await login(signUpData);

          // login after creating account
          Auth.login(data.token);
        } catch (err) {
          console.error('Failed to create account', err);
        }
      };

    return (
        <div className='form-container'>
        <form className='form login-form' onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className='form-group'>
            <label>Username</label>
            <input
              className='form-input'
              type='text'
              name='username'
              value={signUpData.username || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              className='form-input'
              type='text'
              name='email'
              value={signUpData.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              className='form-input'
              type='password'
              name='password'
              value={signUpData.password || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-primary' type='submit'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    )
}

export default SignUp;