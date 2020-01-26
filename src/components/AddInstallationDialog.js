import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import {CSSTransition} from 'react-transition-group'

class AddInstallationDialog extends Component {

  constructor(props){
    super(props)

    this.state = {
      disableRadio: true,
      checkedVariable: false,
      checkedGlecteur: false,
      checkedBadge: false,
      checkedProfil: false,
      mode: 'normal',
      appear: false,
    }

    this.classes = makeStyles(theme => ({
      button: {
        margin: theme.spacing(1),
      },
      input: {
        display: 'none',
      },
    }));
  }

  componentDidMount(){
    this.setState({mode: 'normal',  disableRadio: true, checkedVariable: false, checkedGlecteur: false, checkedBadge: false, checkedProfil: false,});
}

  handelChangeRadio = (e) => {
    const mode = e.target.value
    this.setState({mode})
  }

  handelChangeCheckBox = name => event => {
    this.setState({[name]: event.target.checked });
  };

  render() {
    const disabledRadio = this.state.mode === 'normal'

    return (
      <div>

        <Dialog open={this.props.Open} fullScreen={true} onClose={this.props.Close} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Ajouter une installation</DialogTitle>
          {this.props.DisplayAlert ?
            <div className={this.props.IsLoadingSuccess ? "alert alert-success" : "alert alert-primary"} role="alert">
              {this.props.MessageAlert}
            </div>
            : null}
          {this.props.IsLoading ? <LinearProgress /> : null}
          <form onSubmit={this.props.HandelClickAddInstallation}>
            <DialogContent>
              <DialogContentText>
                Completer les informations ci-dessous pour ajouter une installation
              </DialogContentText>
              <TextField

                autoFocus
                margin="dense"
                id="installationName"
                label="Nom de l'installation"
                type="text"
                name="installationName"
                fullWidth
                required
              />

              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div>
                  <input
                    accept="application/zip"
                    className={'d-none'}
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="upload"
                    required
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                </div>
                <Chip
                  avatar={<ArrowDropDownIcon/>}
                  label="mode d'installation"
                  onClick={() => {
                    const appear = !this.state.appear
                    this.setState({appear})
                  }}
                  variant="outlined"
                  className={'ml-auto'}
                />
              </div>
              <CSSTransition in={this.state.appear} timeout={300} classNames={'addInstallationDialogOptionsFade'}>
              <div className={"addInstallationDialogOptionsFade-appear-done"} style={{overflow: 'hidden'}}>
                <RadioGroup value={this.state.mode} onChange={this.handelChangeRadio} required name={'mode'}>
                  <FormControlLabel
                    value='normal'
                    control={<Radio color="primary" />}
                    label="Normal"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value='minimal'
                    control={<Radio color="primary" />}
                    label="Minimal"
                    labelPlacement="start"
                  />
                </RadioGroup>

                <FormGroup >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkedVariable}
                        onChange={this.handelChangeCheckBox("checkedVariable")}
                        value={1}
                        color="primary"
                        disabled={disabledRadio}
                        name="variable"
                      />
                    }
                    label="Avec les variables non associées"
                    labelPlacement="start"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkedGlecteur}
                        onChange={this.handelChangeCheckBox("checkedGlecteur")}
                        value={2}
                        color="primary"
                        disabled={disabledRadio}
                        name="glecteur"
                      />
                    }
                    label="Avec les groupe de lecteur non associés"
                    labelPlacement="start"
                  />


                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkedProfil}
                        onChange={this.handelChangeCheckBox("checkedProfil")}
                        value={4}
                        color="primary"
                        disabled={disabledRadio}
                        name="profil"
                      />
                    }
                    label="Avec les profils non associés"
                    labelPlacement="start"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkedBadge}
                        onChange={this.handelChangeCheckBox("checkedBadge")}
                        value={8}
                        color="primary"
                        disabled={disabledRadio}
                        name="badge"
                      />
                    }
                    label="Avec les Badge non associés"
                    labelPlacement="start"
                  />
                </FormGroup>

              </div>
              </CSSTransition>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.Close} color="primary">
                {this.props.IsLoadingSuccess ? "Fermer" : "Annuler"}
              </Button>
              <Button type="submit" color="primary">
                Ajouter
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default AddInstallationDialog;