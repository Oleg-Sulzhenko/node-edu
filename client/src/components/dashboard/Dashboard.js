import React, { useEffect } from 'react';
import { getProfileData } from './profile/profileSlice'
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Spinner from '../layout/Spinner';
import Profile from './profile/Profile';
import { Link } from 'react-router-dom';


 const Dashboard = props => {
  const dispatch = useDispatch();
  const { profile: { profile, loading, error } } = useSelector(state=>state);

  useEffect(() => {
    if (isEmpty(profile)) dispatch(getProfileData());
  }, [profile, dispatch]);

   return ( 
     <div>
      {loading ? <Spinner /> : isEmpty(profile) ? <>
        <p>{error && error.msg}</p>
        <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </>
        : 
        <Profile profileData={profile} /> 
      }
     </div>
   )
 }
 
 export default Dashboard
 