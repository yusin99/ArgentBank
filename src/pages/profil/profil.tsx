import styles from './profil.module.scss';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, setUserData } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { dataProfile } from '../../services/api';
import { useDispatch } from 'react-redux';
import { MdCancel } from "react-icons/md";
import UpdateName from '../../components/name-update/updatename';

/**
 * Profile Component
 * 
 * This component renders the user's profile page, including account information
 * and the ability to edit the user's name.
 */
const Profile = () => {
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
   * State to control visibility of the name update form
   */
  const [showUpdateName, setShowUpdateName] = useState(false);

  /**
   * Effect hook to check login status and fetch user data
   */
  useEffect(() => {
    if (!userLogin.statusLogin) {
      // Redirect to home if not logged in
      navigate('/');
    } else {
      // Fetch user profile data if logged in
      dataProfile(userLogin.token!).then((data) => {
        if (data.status) {
          dispatch(setUserData(data.body));
        }
      });
    }
  }, [userLogin.statusLogin, showUpdateName]);

  /**
   * Toggle visibility of name update form
   */
  const editProfile = () => {
    setShowUpdateName(!showUpdateName);
  };

  // Render profile only if user is logged in
  if (userLogin.statusLogin) {
    return (
      <main className={styles['container-profile']}>
        <div className={styles['header']}>
          {showUpdateName ? (
            // Render name update form if showUpdateName is true
            <UpdateName isOpen={setShowUpdateName} />
          ) : (
            // Otherwise, display welcome message with user's name
            <h1>
              Welcome back
              <br />
              {userData.firstName} {userData.lastName}
            </h1>
          )}
          <button className={styles['edit-button']} onClick={editProfile}>
            {showUpdateName ? (
              // Show cancel button when update form is visible
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <MdCancel />
                <p style={{all: 'unset'}}>Cancel</p>
              </div>
            ) : (
              // Otherwise, show edit button
              'Edit Name'
            )}
          </button>
        </div>
        <h2 className='sr-only'>Accounts</h2>
        {/* Checking Account Section */}
        <section className={styles['account']}>
          <div className={styles['account-content-wrapper']}>
            <h3 className={styles['account-tittle']}>
              Argent Bank Checking (x8349)
            </h3>
            <p className={styles['account-amount']}>$2,082.79</p>
            <p className={styles['account-amout-description']}>
              Available Balance
            </p>
          </div>
          <div className={styles['account-content-wrapper cpa']}>
            <button className={styles['transaction-button']}>
              View transactions
            </button>
          </div>
        </section>
        {/* Savings Account Section */}
        <section className={styles['account']}>
          <div className={styles['account-content-wrapper']}>
            <h3 className={styles['account-tittle']}>
              Argent Bank Savings (x6712)
            </h3>
            <p className={styles['account-amount']}>$10,928.42</p>
            <p className={styles['account-amout-description']}>
              Available Balance
            </p>
          </div>
          <div className={styles['account-content-wrapper cpa']}>
            <button className={styles['transaction-button']}>
              View transactions
            </button>
          </div>
        </section>
        {/* Credit Card Account Section */}
        <section className={styles['account']}>
          <div className={styles['account-content-wrapper']}>
            <h3 className={styles['account-tittle']}>
              Argent Bank Credit Card (x8349)
            </h3>
            <p className={styles['account-amount']}>$184.30</p>
            <p className={styles['account-amout-description']}>
              Current Balance
            </p>
          </div>
          <div className={styles['account-content-wrapper cpa']}>
            <button className={styles['transaction-button']}>
              View transactions
            </button>
          </div>
        </section>
      </main>
    );
  } else {
    // Return null if user is not logged in
    return null;
  }
};

export default Profile;