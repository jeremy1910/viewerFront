import React, {Component} from 'react';
import NavBar from './components/NavBar'
import MiddelBlock from './components/MiddelBlock'
import ResultPannel from './components/ResultPannel'
import ChoiceInstallationDialog from './components/choiceInstallationDialog'
import AddInstallationDialog from './components/AddInstallationDialog'
import UpdateInstallationDialog from './components/updateInstallationDialog'
import ChangeServerUrlDialog from './components/ChangeServerURLDialog'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {CSSTransition} from 'react-transition-group'
import axios from 'axios'
import 'bootstrap-material-design/scss/bootstrap-material-design.scss'
import {MDCDialog} from "@material/dialog";
import {MDCList} from '@material/list';


const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#d50000'
      }
    }
  },
)

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      dialog: null,
      list: null,
      selectedInstallation: null,
      scrollY: 0,
      resultPannelID: null,
      installations: [],
      openDialogAddInstallation: false,
      openDialogUpdateInstallation: false,
      openDialogChangeServerURL: false,
      serverURL: '127.0.0.1:8000',
      isLoading: false,
      isLoadingSuccess: null,
      displayAlert: false,
      messageAlert : '',
      APIOnline : true,
      reduceMenu : false,
    }
  }

  componentDidMount() {
    const dialog = new MDCDialog(document.querySelector('#selectInstallationDialog'));
    const list = new MDCList(document.querySelector('.mdc-dialog .mdc-list'));
    let offset = 100
    window.onscroll = () => {
      if (window.scrollY > offset && !this.state.reduceMenu){
        this.setState({reduceMenu: true})
      }
      else if (window.scrollY <= offset && this.state.reduceMenu) {

        this.setState({reduceMenu: false})
      }


    }

    window.setInterval(() => {
      axios.get(`http://${this.state.serverURL}/api/installations`)
        .then(
          () => {
            this.setState({APIOnline: true})
          }
        )
        .catch(
          () => {
            this.setState({APIOnline: false})
          }

        )
    }, 4000)

    dialog.listen('MDCDialog:opened', () => {
      list.layout();
    });

    this.setState({dialog, list})

    const serverURL = localStorage.getItem('serverURL')
    if (serverURL){
      this.setState({serverURL})
    }



  }

  handelServerURL = (serverURL) => {
    localStorage.setItem('serverURL', serverURL)
    this.setState({serverURL})
  }

  setResultPannelID = (resultPannelID) => {
    if (this.state.resultPannelID === null)
    {
      this.setState({resultPannelID})
    }
  }

  displayChoiceInstallationDialog =  () => {
    this.state.dialog.layout()
    this.state.dialog.open()
  }

  handelValideDialog = (e) => {
    if(this.state.list.foundation_.getSelectedIndex() >= 0){
      const selectedInstallation =  {id: this.state.list.foundation_.adapter_.getAttributeForElementIndex(this.state.list.foundation_.getSelectedIndex(), 'data-id'), name: this.state.list.foundation_.adapter_.getAttributeForElementIndex(this.state.list.foundation_.getSelectedIndex(), 'data-name')}
      this.resetAlertMessageInDialog()
      this.setState({selectedInstallation})
    }
  }

  handelOpenDialogAddInstallation = () => {
    this.setState({openDialogAddInstallation: true})
  }

  handelCloseDialogAddInstallation = () => {
    this.setState({openDialogAddInstallation: false})
    this.resetAlertMessageInDialog()
  }

  handelOpenDialogChangeServerURL = () => {
    this.setState({openDialogChangeServerURL: true})
  }

  handelCloseDialogChangeServerURL = () => {
    this.setState({openDialogChangeServerURL: false})
    this.resetAlertMessageInDialog()
  }

  handelOpenDialogUpdateInstallation = () => {
    this.setState({openDialogUpdateInstallation: true})
  }

  handelCloseDialogUpdateInstallation = () => {
    this.setState({openDialogUpdateInstallation: false})
    this.resetAlertMessageInDialog()
  }

  resetAlertMessageInDialog = () => {
    this.setState({displayAlert: false,  isLoadingSuccess: null, messageAlert: ''})
  }

  setAlertMessageInDialog = (message) => {
    this.setState({displayAlert: true,  isLoadingSuccess: null, messageAlert: message})
  }

  handelClickAddInstallation = (e) => {
    e.preventDefault()
    this.resetAlertMessageInDialog()
    const formdata = new FormData(e.target)
    // for(var pair of formdata.entries()) {
    //   console.log(pair[0]+ ', '+ pair[1]);
    // }
    let value = null
    if(formdata.get('mode') === 'normal'){
      value = 15
    }else{
      value = 0;
      if (formdata.get("variable")){
        value += 1
      }
      if (formdata.get("glecteur")){
        value += 2
      }
      if (formdata.get("profil")){
        value += 4
      }
      if (formdata.get("badge")){
        value += 8
      }
    }
    formdata.append('mode', value)

    this.setState({isLoading: true})
    axios({
      method: 'post',
      url: `http://${this.state.serverURL}/addInstallation`,
      data: formdata,
      headers: {'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then((response) => this.handelAddInstallationResponse(response))
      .catch((response) => this.handelAddInstallationError(response));

  }

  handelAddInstallationError = (response) => {
    this.setState({isLoading: false})

  }

  handelAddInstallationResponse = (response) =>  {
    this.setState({isLoading: false})
    console.log(response);
    if (response.data.success){
      this.setState({displayAlert: true,  isLoadingSuccess: true, messageAlert: response.data.message})
    }
    else {
      this.setState({displayAlert: true,  isLoadingSuccess: false, messageAlert: response.data.message})

    }
  }

  handelSubmitUpdateInstallation = (e) => {
    e.preventDefault()
    this.resetAlertMessageInDialog()

    const form = new FormData(e.target)

    if (form.get('UpdateDialogSelectedInstallation').length <= 0)
    {
      const error = "Merci de selectionner une Installation"
      this.setState({displayAlert: true,  isLoadingSuccess: false, messageAlert: error})

    }else {
      const url = `http://${this.state.serverURL}/updateInstallation/${form.get('UpdateDialogSelectedInstallation')}`
      if (form.get('UpdateDialogSelectedRadio') === '0'){
        form.delete('UpdateDialogSelectedRadio')
        form.delete('UpdateDialogSelectedInstallation')

        this.setState({isLoading: true})
        axios({
          method: 'post',
          url: url,
          data: form,
          headers: {'Content-Type': 'application/x-www-form-urlencoded' }
        })
          .then((response) => this.handelAddInstallationResponse(response))
          .catch((response) => this.handelAddInstallationError(response));

      }else if (form.get('UpdateDialogSelectedRadio') === '1'){
        const url = `http://${this.state.serverURL}/removeInstallation/${form.get('UpdateDialogSelectedInstallation')}`
        this.setState({isLoading: true})
        axios({
          method: 'get',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded' }

        })
          .then((response) => this.handelAddInstallationResponse(response))
          .catch((response) => this.handelAddInstallationError(response));
      } else{
      }
    }
  }

  render(){

    return (

      <CSSTransition appear={true} in={true} timeout={800} classNames={'mainFade'}>
        <div>
          <MuiThemeProvider theme={theme}>

            <div className="d-flex flex-column min-vh-100">

                  <NavBar OnClickAddInstallation={this.handelOpenDialogAddInstallation} OnClickOpenInstallation={this.displayChoiceInstallationDialog} OnClickUpdateInstallation={this.handelOpenDialogUpdateInstallation} ReduceMenu={this.state.reduceMenu} APIOnline={this.state.APIOnline} HandelOpenDialogChangeServerURL={this.handelOpenDialogChangeServerURL} ServerURL={this.state.serverURL} HandelServerURL={this.handelServerURL}/>
                  <MiddelBlock ReduceMenu={this.state.reduceMenu} HandelOpenUpadteInstallationDialog={this.handelOpenDialogUpdateInstallation} HandelOpenDialogAddInstallation={this.handelOpenDialogAddInstallation} SetResultPannelID={this.setResultPannelID} displayChoiceInstallationDialog={this.displayChoiceInstallationDialog}/>
                  <ResultPannel  ServerURL={this.state.serverURL} SelectedInstallation={this.state.selectedInstallation}/>

            </div>
            <ChoiceInstallationDialog MessageAlert={this.state.messageAlert} DisplayAlert={this.state.displayAlert} ResetAlertMessageInDialog={this.resetAlertMessageInDialog} SetAlertMessageInDialog={this.setAlertMessageInDialog} ServerURL={this.state.serverURL} HandelValideDialog={this.handelValideDialog}/>
            {this.state.openDialogAddInstallation ? <AddInstallationDialog MessageAlert={this.state.messageAlert} DisplayAlert={this.state.displayAlert} IsLoadingSuccess={this.state.isLoadingSuccess} IsLoading={this.state.isLoading}  HandelClickAddInstallation={this.handelClickAddInstallation} Open={this.state.openDialogAddInstallation} Close={this.handelCloseDialogAddInstallation}/> : null}
            {this.state.openDialogUpdateInstallation ? <UpdateInstallationDialog   ServerURL={this.state.serverURL} MessageAlert={this.state.messageAlert} DisplayAlert={this.state.displayAlert} IsLoadingSuccess={this.state.isLoadingSuccess} IsLoading={this.state.isLoading} HandelSubmitUpdateInstallation={this.handelSubmitUpdateInstallation} HandelCloseDialogUpdateInstallation={this.handelCloseDialogUpdateInstallation} Open={this.state.openDialogUpdateInstallation}/>: null}
            {this.state.openDialogChangeServerURL ? <ChangeServerUrlDialog ServerURL={this.state.serverURL} HandelServerURL={this.handelServerURL} HandelCloseDialogChangeServerURL={this.handelCloseDialogChangeServerURL} Open={this.state.openDialogChangeServerURL}/>: null}


          </MuiThemeProvider>

        </div>
      </CSSTransition>
    )
  }


}

export default App;
