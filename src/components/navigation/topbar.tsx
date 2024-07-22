import styles from './topbar.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
  resetUser,
  signOutReducer
} from '../../redux/store';

/**
 * Topbar Component
 * 
 * This component renders the top navigation bar of the application.
 * It handles user authentication status, navigation, and sign out functionality.
 */
const Topbar = () => {
  /**
   * Selectors to get user login status and user data from Redux store
   */
  const userLogin = useSelector((state: RootState) => state.login);
  const userData = useSelector((state: RootState) => state.user);

  /**
   * Hook to dispatch actions to the Redux store
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Hook for programmatic navigation
   */
  const navigate = useNavigate();

  /**
   * Handler for sign out action
   * It updates the Redux store and navigates to the home page
   */
  const signOut = () => {
    // Dispatch action to update login status
    dispatch(signOutReducer());

    // Dispatch action to clear user data
    dispatch(resetUser());

    // Navigate to home page
    navigate('/');
  };

  return (
    <nav className={styles['main-nav']}>
      {/**
       * Logo and home link
       */}
      <Link to={'/'} className={styles['main-nav-logo']}>
        <img
          className={styles['main-nav-logo-image']}
          src='./assets/argentBankLogo.png'
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>

      <div className={styles['main-nav-container']}>
        {/**
         * Conditional rendering based on login status
         * If user is logged in, show profile link with user's first name
         */}
        {userLogin.statusLogin && (
          <Link className={styles['main-nav-item']} to={'/profile'}>
            <FaCircleUser />
            {userData.firstName}
          </Link>
        )}

        {/**
         * Conditional rendering based on login status
         * If user is logged in, show Sign Out button
         * If user is not logged in, show Sign In link
         */}
        {userLogin.statusLogin ? (
          <div className={styles['sign-out']} onClick={signOut}>
            <FaSignOutAlt />
            Sign Out
          </div>
        ) : (
          <Link className={styles['main-nav-item']} to={'/login'}>
            <FaCircleUser />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Topbar;