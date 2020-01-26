import React, {PureComponent, Fragment} from 'react';
import SelecterElement from './SelecterElement'
import TableResultHandler from './TableResultHandler'

class ResultPannel extends PureComponent {

  state = {
    disabledSelect: true,
    disabledInputSearch: true,
    disabledSearchButton: true,
    requiredInputSearch: true,
    disabledSubmitSearch: true,
    selectedElement: '',
    selectedCategory: '',
    textSearch: '',
    searchResult : null,
    request: null,

    selectedPage:1,
    resultPerPage: 15,
    loadingInProgress: false,
    errorInResponse: false,
    errorMessage: '',
    openDialogShowPH: false,
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.selectedElement !== this.state.selectedElement ||
      prevState.selectedCategory !== this.state.selectedCategory ||
      prevState.textSearch !== this.state.textSearch ||
      prevState.resultPerPage !== this.state.resultPerPage ||
      prevProps.SelectedInstallation !== this.props.SelectedInstallation

    ){
      this.buildRequest()
    }else if ( prevState.selectedPage !== this.state.selectedPage){
      this.buildRequest(true)
    }
    if (prevProps.SelectedInstallation !== this.props.SelectedInstallation){
      this.handelClickOnReset();
    }
  }

  handelSelectChange = (value) => {
    this.setState({selectedElement: value, selectedCategory: '', textSearch: '', selectedPage: 1})
  }

  handelSelectCategory = (value) => {
    this.setState({selectedCategory: value, textSearch: '', errorInResponse: false, errorMessage: ''})
  }

  handelChangeSearch = (e) => {
    const textSearch = e.target.value
    this.setState({textSearch})
  }

  handelClickSearchButton = (e) => {
    e.preventDefault()
    this.launcheAjax()
  }

  handelLoadingInProgress = (value) => {
    this.setState(() => ({loadingInProgress : value}))
  }

  handelClickLink = (e) => {
    const id = e.target.offsetParent.firstChild.innerText
    this.setState({selectedElement: e.currentTarget.dataset.element, selectedCategory: 'id', textSearch: id}, () => this.buildRequest())
  }

  handelChangeRowsPerPage = (e) => {

    const resultPerPage = e.target.value
    this.setState({resultPerPage}, () => console.log(this.state.resultPerPage))
  }

  launcheAjax = () => {
    this.setState(() => ({loadingInProgress: true}))
    fetch(this.state.request)
      .then(res => res.json())
      .then((data) => {
        if (! data.success) {
          this.setState({ errorInResponse: true, errorMessage: data.result ,loadingInProgress: false, searchResult: null})
        }
        else{
          this.setState({errorInResponse: false, searchResult: {selectedElement: this.state.selectedElement, data: data}})
        }
      })
      .catch(
      )
  }

  buildRequest = (withSendRequest = false) => {
    const base = `http://${this.props.ServerURL}/api`
    const installationID = this.props.SelectedInstallation ? this.props.SelectedInstallation.id : ''
    const element = this.state.selectedElement
    const category = this.state.selectedCategory
    const textSearch = this.state.textSearch
    const resultPerPage = this.state.resultPerPage
    const selectedPage = this.state.selectedPage
    const startLimit = this.getStartLimit(selectedPage, resultPerPage)
    let variables = null
    let request = null

    if (installationID){
      this.setState({disabledSearchButton: false})
    }

    if(this.state.selectedCategory === 'ALL' || this.state.selectedCategory === ''){
      variables = '';
      request = base+'/'+installationID+'/'+element+variables+'?start='+startLimit.start+'&limit='+startLimit.limit
      this.setState({disabledInputSearch: true})
      this.setState({requiredInputSearch: false})
    }
    else{
      if (category === 'id'){
        variables = element+'/'+textSearch
        request = base+'/'+variables
        this.setState({requiredInputSearch: true})
      }
      else{
        variables = '/search/'+category+'?'+category+'='+textSearch
        request = base+'/'+installationID+'/'+element+variables+'&start='+startLimit.start+'&limit='+startLimit.limit
        this.setState({requiredInputSearch: false})
      }
      this.setState({disabledInputSearch: false})
    }

    this.setState({request}, () => {
      if (this.state.textSearch.length > 3 || (category === 'id' && this.state.textSearch.match("^[0-9]+$"))){
        this.launcheAjax(this.state.request)
      }
    })

    if (withSendRequest){
      this.setState({request}, () => {this.launcheAjax(this.state.request)})
    }
  }

  getStartLimit = (selectedPage, resultPerPage) => {
    return {start: (selectedPage*resultPerPage)-resultPerPage, limit: resultPerPage}
  }

  handelClickPage = (selectedPage) => {
    this.setState({selectedPage})
  }

  handelClickOnReset = () => {
    this.setState({selectedElement: '', selectedCategory: '', textSearch: '', searchResult : null, request: null, selectedPage:1, resultPerPage: 15})
  }

  render() {
    console.log('render ResultPanel')
    let disabledSelect = true;
    if (this.props.SelectedInstallation){
      disabledSelect = false
    } else {
      disabledSelect = true;
    }
    const errorBlock = this.state.errorInResponse ?  <div className={"alert alert-primary"} role="alert"> {this.state.errorMessage} </div> : null

    return (
      <Fragment>
        <div  className="flex-grow-1 bgMenu pannel shadowMenu">
          <div className="d-flex flex-column align-items-center">
            <h3 className="mdc-typography--button">{this.props.SelectedInstallation === null ? 'Aucune installation selectionnée': <span>Installation selectionnée : <span className={'colorRed'}>{this.props.SelectedInstallation.name} </span></span>}</h3>

            <SelecterElement HandelClickOnReset={this.handelClickOnReset} LoadingInProgress={this.state.loadingInProgress} DisabledSearchButton={this.state.disabledSearchButton} RequiredInputSearch={this.state.requiredInputSearch} DisabledSubmitSearch={this.state.disabledSubmitSearch} DisabledInputSearch={this.state.disabledInputSearch} TextSearch={this.state.textSearch} SelectedElement={this.state.selectedElement} SelectedCategory={this.state.selectedCategory} HandelChangeSearch={this.handelChangeSearch} HandelSelectChange={this.handelSelectChange} HandelSelectCategory={this.handelSelectCategory} DisabledSelect={disabledSelect} HandelClickSearchButton={this.handelClickSearchButton}/>
            {errorBlock}
            <TableResultHandler  HandelChangeRowsPerPage={this.handelChangeRowsPerPage} HandelLoadingInProgress={this.handelLoadingInProgress} HandelClickPage={this.handelClickPage} ResultPerPage={this.state.resultPerPage} HandelClickLink={this.handelClickLink} SearchResult={this.state.searchResult} SelectedElement={this.state.selectedElement}/>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ResultPannel;