import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ChangeServerUrlDialog extends Component {

  constructor(props){
    super(props)
    this.state = {
      value: ''
    }
  }

  handelChange = (e) => {
    const value = e.target.value
    this.setState({value})
  }

  submit = (e) => {
    e.preventDefault()
    this.props.HandelServerURL(this.state.value)
    this.props.HandelCloseDialogChangeServerURL()
  }

  render() {
    const closeDialog = this.props.HandelCloseDialogChangeServerURL
    return (
      <div>
        <Dialog
          open={this.props.Open}
          onClose={closeDialog}
        >
          <form onSubmit={this.submit}>
            <DialogTitle>{"Editer l'adresse du serveur API"}</DialogTitle>
            <DialogContent>
              <div className='h-100'><span style={{verticalAlign: 'bottom'}}>http://</span><TextField required value={this.state.value} onChange={this.handelChange} placeholder={this.props.ServerURL}  /><span style={{verticalAlign: 'bottom'}}>/api</span></div>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                Annuler
              </Button>
              <Button type={'submit'} color="primary" autoFocus>
                valider
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default ChangeServerUrlDialog;