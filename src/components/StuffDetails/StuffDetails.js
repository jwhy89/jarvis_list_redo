import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, TextField, Grid, FormControl } from '@material-ui/core';
import './StuffDetails.css';
// @material-ui/icons
import Deleted from "@material-ui/icons/DeleteOutlineRounded";
import EditIcon from "@material-ui/icons/EditRounded";
import UpdateIcon from "@material-ui/icons/DoneRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";

const moment = require('moment');

class StuffDetails extends Component {

  state = {
    currentlyEditing: false,
    editStuff: {},
    flashMessage: ''
  }

  // function to get details from database and redux state before rendoring
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DETAILS', payload: this.props.match.params.id });
    console.log('in componentdidmount', this.props.reduxState.details);
    this.props.dispatch( {type: 'FETCH_TYPE'} );
    this.props.dispatch( {type: 'FETCH_PD'} );
    this.props.dispatch( {type: 'FETCH_STATUS'} );
  }

  // async issue with componentDidMount
  // used to pull stuff details into current state in component
  componentDidUpdate(prevProps) {
    if (this.props.reduxState.details !== prevProps.reduxState.details) {
      this.setState({
        editStuff: {
          name: this.props.reduxState.details.name,
          description: this.props.reduxState.details.description,
          last_used: moment(this.props.reduxState.details.last_used).format('YYYY-MM-DD'),
          price: this.props.reduxState.details.price,
          image_url: this.props.reduxState.details.image_url,
          quantity: this.props.reduxState.details.quantity,
          physical_or_digital_id: this.props.reduxState.details.physical_or_digital_id,
          quantity_type_id: this.props.reduxState.details.quantity_type_id,
          status_id: this.props.reduxState.details.status_id,
          active: this.props.reduxState.details.active,
          id: this.props.reduxState.details.id,
      }
      })
    }
  }

  // function to delete stuff from database
  deleteStuff = () => {
    this.props.dispatch({ type: 'DELETE_STUFF', payload: this.props.reduxState.details.id })
    this.props.history.push('/');
    console.log('in delete stuff', this.props.reduxState.details.id)
  }

  // message to confirm  that stuff was edited
  flashMessage = (message) => {
    this.setState({ flashMessage: message });
    setTimeout(() => {
      this.setState({ flashMessage: '' });
    }, 2500)
  }

  // called when clicked on; will allow user to edit pre-populated field from reduxState
  handleEdit = (event) => {
    console.log('in handleEdit');
    this.props.dispatch({ type: 'FETCH_DETAILS', payload: this.props.match.params.id });
    let stuffId = event.currentTarget.value;
    console.log(stuffId);
    this.setState({
      currentlyEditing: true,
    })
    console.log(this.state.currentlyEditing);
  }

  // Called when the submit button is pressed
  // PUT request to database
  handleEditSubmit = (event) => {
    console.log('in handleEditSubmit');
    this.setState({
        currentlyEditing: false,
    })
    this.props.dispatch({type:'EDIT_DETAILS', payload: this.state.editStuff});
    this.flashMessage('Stuff successfully updated!');
  }

  // Called when the submit button is pressed
  // PUT request to database
  handleEditCancel = (event) => {
    console.log('in handleEditSubmit');
    // this.props.dispatch({ type: 'FETCH_DETAILS', payload: this.props.match.params.id });
    this.setState({
        currentlyEditing: false,
    })
  }

  // Called when the input field changes
  handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
        editStuff: {
            ...this.state.editStuff,
            [propertyName]: event.target.value,
        }
    });
    }
  }

  render() {
    const stuff = this.props.reduxState.details;
    console.log(this.state.editStuff.image_url)
    // console.log(this.state.editStuff)
    
    return (
      <Grid container
      direction="row"
      justify="center"
      alignItems="stretch">
      <Grid item
        xs={12}
        sm={10}
        md={8}
        lg={6}>
        <Grid container
          direction='column'
          justify='space-between'
          alignItems='stretch'
          spacing={16}
        >
          <Grid item>
            {/* <h1>{JSON.stringify(this.props.reduxState.details.name)}</h1> */}
            <h1 style={{textAlign: 'center'}}>{stuff.name}</h1>
            { 
            (this.state.flashMessage)
              ? <p className='flash'>{ this.state.flashMessage }</p>
              : null
            }
            { this.state.currentlyEditing === true ? 
              <>
              <div className="edit-buttons">
                <div className="update-button">
                <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={this.handleEditSubmit}><UpdateIcon/>Update</Button>
                </div>
                <div>
                <Button variant="contained" onClick={this.handleEditCancel}><CancelIcon/>Cancel</Button>
                </div>
              </div>
              </> :
              <Button variant="contained" style={{ backgroundColor: 'orange', textAlign: 'right'}} onClick={this.handleEdit}><EditIcon/>Edit</Button>
            }
          </Grid>
          <Grid item >
            <img src={stuff.image_url} alt={stuff.name}
             style={{width: '100%', height: 400, display: 'flex'}}/>
          </Grid>
          <Grid item style={{width: '100%'}}>
              <><span>ID: {stuff.id}</span><br /></>
              {this.state.currentlyEditing === true ?
              <>
              <FormControl style={{ display: 'flex' }} onSubmit={this.handleSubmit}>
              <TextField
                label="Edit Name"
                onChange={this.handleChange('name')} 
                defaultValue={`${stuff.name}`}
                margin="dense"
                variant="filled"
                fullWidth={true}/>
              <br />
              <TextField
                label="Edit Description"
                onChange={this.handleChange('description')} 
                defaultValue={`${stuff.description}`}
                margin="dense"
                variant="filled"
                fullWidth={true}
                multiline={true}/>
              <br />
              <TextField
                label="Last Used"
                type="date"
                defaultValue={moment().format('YYYY-MM-DD')}
                onChange={this.handleChange('last_used')}
                margin="dense"
                variant="filled"
                fullWidth={true}/>
              <br />
              <TextField
                label="Price $"
                type="money"
                onChange={this.handleChange('price')}
                defaultValue={`${stuff.price}`}
                margin="dense"
                variant="filled"
                fullWidth={true}/>
              <br />
              <TextField
                label="Image URL"
                type="url"
                onChange={this.handleChange('image_url')}
                defaultValue={`${stuff.image_url}`}
                margin="dense"
                variant="filled"
                fullWidth={true}/>
              <br />
              <TextField
                label="Edit Quantity"
                type="number"
                onChange={this.handleChange('quantity')}
                defaultValue={`${stuff.quantity}`}
                margin="dense"
                variant="filled"
                fullWidth={true}/>
              <br />
              <label selected disabled >Type</label>
              <select
                defaultValue={`${stuff.quantity_type_id}`}
                onChange={this.handleChange('quantity_type_id')} >
                    {this.props.reduxState.type.map( type => 
                      <option value={type.id} key={type.id}>{type.type}</option>
                    )}
              </select>
              <br />
              <label selected disabled >Physical/Digital</label>
              <select
                defaultValue={`${stuff.physical_or_digital_id}`}
                onChange={this.handleChange('physical_or_digital_id')}>
                    {this.props.reduxState.pd.map( physical_state => 
                      <option value={physical_state.id} key={physical_state.id}>{physical_state.physical_state}</option>
                    )}
              </select>
              <br />
              <label selected disabled >Status</label>
              <select
                defaultValue={`${stuff.status_id}`}
                onChange={this.handleChange('status_id')}>
                    {this.props.reduxState.status.map( status =>
                      <option value={status.id} key={status.id}>{status.status}</option>
                    )}
              </select>
              <br />
              <label selected disabled >Active/Inactive:</label>
              <select
                defaultValue={`${stuff.active}`}
                onChange={this.handleChange('active')} >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
              </select>
              <br />
              </FormControl>
              </> :
              <>
              <Grid item>
                <div>Stuff Name: {stuff.name}</div><br />
                <div>Description: {stuff.description}</div><br />
                <div>Last Used: {moment(stuff.last_used).format('YYYY-MM-DD')}</div><br />
                <div>Price: {stuff.price}</div><br />
                <TextField
                  label="Image URL"
                  type="url"
                  value={`${stuff.image_url}`}
                  margin="dense"
                  variant="filled"
                  fullWidth={true}/>
                <br />
                <div>Quantity: {stuff.quantity} {stuff.type}</div><br />
                <div>Physical State: {stuff.physical_state}</div><br />
                <div>Status: {stuff.status}</div><br />
                <div>Active/Inactive: {JSON.stringify(stuff.active)}</div><br /><br />
              </Grid>
              </>}
          </Grid>
            <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => this.deleteStuff()}><Deleted/>Delete</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
});

export default withRouter(connect(mapStateToProps)(StuffDetails));