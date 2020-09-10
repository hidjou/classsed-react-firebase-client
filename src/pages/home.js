// dependancies
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// Components
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
// Redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
// MUI stuff
import Grid from '@material-ui/core/Grid';
import ScreamSkeleton from '../util/ScreamSkeleton';

const Home = (props) => {

  const { getScreams, data: { screams, loading } } = props;

  useEffect(() => {
    getScreams();
  }, [getScreams]);

  let recentScreamsMarkup = !loading ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
      <ScreamSkeleton />
    );
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12} >
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12} >
        <Profile />
      </Grid>
    </Grid>
  )

}

// PropTypes static 
Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  data: state.data
});

// Push Actions To Props
const mapActionsToProps = {
  getScreams
}

export default connect(mapStateToProps, mapActionsToProps)(Home);