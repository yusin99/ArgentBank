/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './updatename.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setUserData } from '../../redux/store';
import { dataProfile, updateProfile } from '../../services/api';

/**
 * Type definition for the component props
 * isOpen is a function to update the state of the parent component
 */
type showProps = {
  isOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * UpdateName Component
 * 
 * This component renders a form to update the user's first and last name.
 * It uses React hooks, Redux for state management, and API calls to update the user profile.
 */
const UpdateName: React.FC<showProps> = ({ isOpen }) => {
  /**
   * Selectors to get user data and login status from Redux store
   */
  const userData = useSelector((state: RootState) => state.user);
  const userLogin = useSelector((state: RootState) => state.login);

  /**
   * Hook to dispatch actions to the Redux store
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * State hooks for first name and last name
   * Initialized with current user data from Redux store
   */
  const [firstName, setFirstName] = useState<string | null>(userData.firstName);
  const [lastName, setLastName] = useState<string | null>(userData.lastName);

  /**
   * Handler for update button click
   * Updates the profile, fetches updated data, and closes the update form
   */
  const clickOnUpdate = () => {
    // Update the profile with new first and last name
    updateProfile(userLogin.token!, firstName!, lastName!);

    // Fetch updated profile data
    dataProfile(userLogin.token!).then((data) => {
      if (data.status) {
        // If fetch is successful, update Redux store with new user data
        dispatch(setUserData(data.body));
      }
    });

    // Close the update form
    isOpen(false);
  };

  return (
    <div className={styles['container']}>
      {/**
       * Input field for first name
       * Value is set to current firstName state, empty string if null
       * onChange updates the firstName state
       */}
      <input
        type='text'
        placeholder='Firstname'
        value={firstName || ''}
        onChange={(e) => setFirstName(e.target.value)}
      />

      {/**
       * Input field for last name
       * Value is set to current lastName state, empty string if null
       * onChange updates the lastName state
       */}
      <input
        type='text'
        placeholder='Lastname'
        value={lastName || ''}
        onChange={(e) => setLastName(e.target.value)}
      />

      {/**
       * Update button
       * onClick triggers the clickOnUpdate function
       */}
      <button onClick={clickOnUpdate}>Update</button>
    </div>
  );
};

export default UpdateName;