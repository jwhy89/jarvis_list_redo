import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import GalleryList from '../GalleryList/GalleryList';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 350,
    display: 'flex',
    minWidth: '100%',
    overflow: 'hidden',
    width: '100%',
  },
});

class Gallery extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = this.props.reduxState.stuff.length;

    // async issues with redux; need to write conditional to load reducer;
    // initially the properties of the reducer array were coming in undefined
    let stuffName = "";
    if(maxSteps > 0) {
      stuffName = this.props.reduxState.stuff[activeStep].stuff_name;
    }
    

    return (
      <>
        {/* <h1>{JSON.stringify(`thing: ${stuffQ}`)}</h1> */}
        <div className={classes.root} style={{textAlign: 'center'}}>
          <h2>
            {stuffName}
          </h2>
          <AutoPlaySwipeableViews
            style={{ display: 'flex' }}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={this.handleStepChange}
            enableMouseEvents
          >
            {this.props.reduxState.stuff.map((step, index) => (
              <div key={step.id}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <img className={classes.img} src={step.image_url} alt={step.name} />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          {/* Can change variant to text or progress in the MobileStepper when 
          StuffList gets too big. The stepper dots will outgrow the page */}
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.mobileStepper}
            nextButton={
              <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
          </div>
          <GalleryList />
          <br/>
        </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
})

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// export default withStyles(styles, { withTheme: true })(Gallery);

const StyledGallery = withStyles(styles, { withTheme: true })(Gallery);
export default withRouter(connect(mapReduxStateToProps)(StyledGallery));