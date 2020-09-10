// Dependancies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
// MUI stuff
import Grid from '@material-ui/core/Grid';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

const User = (props) => {

  const { getUserData, data: { screams, loading } } = props;

  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState(null);

  useEffect(() => {

    const { handle, screamId } = props.match.params;

    if (screamId) setScreamIdParam(screamId);

    getUserData(handle);
    fetchUserDetails(handle);
  }, [getUserData, props.match.params])

  const fetchUserDetails = async (handle) => {
    try {
      let res = await axios.get(`/user/${handle}`);
      setProfile(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const screamsMarkup = loading ? (

    <ScreamSkeleton />
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
          screams.map(scream => {
            if (scream.screamId === screamIdParam)
              return <Scream key={scream.screamId} scream={scream} openDialog />
            else return <Scream key={scream.screamId} scream={scream} />
          })
        );

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
            <StaticProfile profile={profile} />
          )}
      </Grid>
    </Grid>
  );
}

// PropTypes  
User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  data: state.data
});

// Push Actions To Props
const mapActionsToProps = {
  getUserData
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(User);