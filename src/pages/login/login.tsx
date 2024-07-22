/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormEvent, useRef, useState } from 'react';
import styles from './login.module.scss';
import { FaCircleUser } from 'react-icons/fa6';
import { statusLogin } from '../../services/api.ts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, signInReducer } from '../../redux/store.ts';

/**
 * Login Component
 * 
 * This component renders a login form and handles the sign-in process.
 * It uses React hooks, Redux for state management, and React Router for navigation.
 */
const Login = () => {
  /**
   * Refs for username and password input fields
   * These allow direct access to the input values without controlled components
   */
  const refUsername = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  /**
   * State to manage error messages
   */
  const [error, setError] = useState<string>('');

  /**
   * Hook for programmatic navigation
   */
  const navigate = useNavigate();

  /**
   * Hook to dispatch actions to the Redux store
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Handler for form submission
   * @param {FormEvent} e - The form submission event
   */
  const signIn = (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    /**
     * Call the statusLogin API with username and password
     * The '!' is used to assert that the current value is not null (disabled by eslint at the top)
     */
    statusLogin(refUsername.current!.value, refPassword.current!.value).then(
      (response) => {
        if (response.status === 200) {
          /**
           * If login is successful:
           * 1. Dispatch an action to update the Redux store with login status and token
           * 2. Navigate to the profile page
           */
          dispatch(
            signInReducer({ statusLogin: true, token: response.body.token })
          );
          navigate('/profile');
        } else {
          // If login is unsuccessful, display an error message
          setError('Invalid username or password');
        }
      }
    ).catch(() => {
      // Catch any other errors and display a generic error message
      setError('An error occurred. Please try again.');
    });
  };

  return (
    <main className={styles['container-login']}>
      <section className={styles['sign-in-content']}>
        <FaCircleUser />
        <h1>Sign In</h1>
        {/**
         * Login form
         * onSubmit calls the signIn function when the form is submitted
         */}
        <form onSubmit={(e) => signIn(e)}>
          {/**
           * Username input field
           */}
          <div className={styles['input-wrapper']}>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' ref={refUsername} />
          </div>
          {/**
           * Password input field
           */}
          <div className={styles['input-wrapper']}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' ref={refPassword} />
          </div>
          {/**
           * Remember me checkbox
           * Note: Functionality for this is not implemented in this component
           */}
          <div className={styles['input-remember']}>
            <input type='checkbox' id='remember-me' />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          {/**
           * Display error message if it exists
           */}
          {error && <div className={styles['error-message']} style={{ color: 'red' }}>{error}</div>}
          {/**
           * Submit button
           */}
          <button className={styles['sign-in-button']} type='submit'>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
