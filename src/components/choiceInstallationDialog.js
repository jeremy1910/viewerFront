import React, {Component, Fragment} from 'react';
import {MDCDialog} from '@material/dialog';
import axios from 'axios/index'

class ChoiceInstallationDialog extends Component {

  componentDidMount() {
    this.makeInstallationList()
    this.dialog = new MDCDialog(document.querySelector('#selectInstallationDialog'));
    this.dialog.listen('MDCDialog:opened', () => {
      this.makeInstallationList()
    });
    this.dialog.listen('MDCDialog:closed', () => {
      this.props.ResetAlertMessageInDialog()
    });
  }

  state = {
    installations: []
  }

  generateList = null

  makeInstallationList = () => {
    axios.get(`http://${this.props.ServerURL}/api/installations`)
      .then((data) => {

        this.setState({ installations: data.data })
      })
      .catch(() => {
        this.setState({ installations: [] })
        this.props.SetAlertMessageInDialog(`Le serveur ${this.props.ServerURL} ne repond pas`)
      })
  }

  render() {

    this.generateList = this.state.installations.map((item, key) =>
      <li key={key} className="mdc-list-item" data-id={item.id} data-name={item.name} tabIndex="0">
        <span className="mdc-list-item__graphic">
          <div className="mdc-radio">
            <input className="mdc-radio__native-control" type="radio" id="test-dialog-baseline-confirmation-radio-1" name="test-dialog-baseline-confirmation-radio-group" />
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
        </span>
        <label id="test-dialog-baseline-confirmation-radio-1-label" htmlFor="test-dialog-baseline-confirmation-radio-1" className="mdc-list-item__text">{item.name}</label>
      </li>
    );

    return (
      <Fragment>
        <div id={'selectInstallationDialog'} className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content">
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface">
              <h2 className="mdc-dialog__title" id="my-dialog-title">Selectionner une installation</h2>
              <div className="mdc-dialog__content" id="my-dialog-content">
                {this.props.DisplayAlert ?
                  <div className={this.props.IsLoadingSuccess ? "alert alert-success" : "alert alert-primary"} role="alert">
                    {this.props.MessageAlert}
                  </div>
                  : null}
                <ul className="mdc-list">
                  {this.generateList}
                </ul>
              </div>
              <footer className="mdc-dialog__actions">
                <button type="button" className="mdc-button mdc-dialog__button"
                        data-mdc-dialog-action="close">
                  <span className="mdc-button__label">Annuler</span>
                </button>
                <button  onClick={this.props.HandelValideDialog} type="button" className="mdc-button mdc-dialog__button"
                         data-mdc-dialog-action="accept">
                  <span className="mdc-button__label">OK</span>
                </button>
              </footer>
            </div>
          </div>
          <div className="mdc-dialog__scrim"></div>
        </div>
      </Fragment>
    );
  }
}

export default ChoiceInstallationDialog;