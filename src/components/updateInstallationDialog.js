import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class UpdateInstallationDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      radioValue: '0',
      selectValue: '',
      installations: []
    }
    this.useStyles = makeStyles()
  }

  makeInstallationList = () => {
    fetch(`http://${this.props.ServerURL}/api/installations`)
      .then(res => res.json())
      .then((data) => {
        this.setState({ installations: data })
      })
      .catch(console.log)
  }

  componentDidMount(){
    this.makeInstallationList()
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.Open && !prevProps.Open){
      this.makeInstallationList()
    }
  }

  handleChangeRadioValue = (e) => {
    this.setState({radioValue: e.target.value})
  }

  handelChangeSelectValue = (e) => {
    this.setState({selectValue: e.target.value})
  }

  makeList = () => this.state.installations.map((installation) => <MenuItem key={installation.id} value={installation.id}>{installation.name}</MenuItem>)

  render() {

    const diabledRadio = this.state.selectValue ? false : true
    const submitButtonValue = this.state.radioValue === '0' ? 'Mettre à jour' : 'Supprimer'
    const listInstallation = this.makeList()
    return (
      <div>

        <Dialog
          open={this.props.Open}
          onClose={this.props.HandelCloseDialogUpdateInstallation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={'sm'}
          fullWidth={true}
        >

          <DialogTitle id="alert-dialog-title">{"Mise à jour d'une installation"}</DialogTitle>
          {this.props.DisplayAlert ?
            <div className={this.props.IsLoadingSuccess ? "alert alert-success" : "alert alert-primary"} role="alert">
              {this.props.MessageAlert}
            </div>
            : null}
          {this.props.IsLoading ? <LinearProgress /> : null}
          <form onSubmit={this.props.HandelSubmitUpdateInstallation}>
            <DialogContent>

              <InputLabel id="demo-simple-select-label">Selectionner une installation</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.selectValue}
                onChange={this.handelChangeSelectValue}
                name={'UpdateDialogSelectedInstallation'}
                className={'w-100 mb-4'}

              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {listInstallation}
              </Select>

              <DialogContentText id="alert-dialog-description">
                Que souhaitez vous faire ?
              </DialogContentText>
              <RadioGroup  disabled={diabledRadio} aria-label="position" name="UpdateDialogSelectedRadio" value={this.state.radioValue} onChange={this.handleChangeRadioValue}>
                <FormControlLabel
                  value="0"
                  disabled={diabledRadio}
                  control={<Radio color="primary" />}
                  label="Mettre à jour l'installation"
                  labelPlacement="end"
                />

                {this.state.radioValue === '0' ?
                  <Fragment>
                    <input
                      className={'d-none'}
                      accept="application/zip"
                      id="contained-button-file"
                      type="file"
                      name={'upload'}
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" component="span">
                        Fichier .zip
                      </Button>
                    </label>
                  </Fragment>
                  : null}
                <FormControlLabel
                  value="1"
                  disabled={diabledRadio}
                  control={<Radio color="primary" />}
                  label="Supprimer l'installation"
                  labelPlacement="end"
                />
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.HandelCloseDialogUpdateInstallation} color="primary">
                {this.props.IsLoadingSuccess ? "Fermer" : "Annuler"}
              </Button>
              {this.state.radioValue?
                <Button type={'submit'} color="primary" autoFocus>
                  {submitButtonValue}
                </Button>
                : null}
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default UpdateInstallationDialog;