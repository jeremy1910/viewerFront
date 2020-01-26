import React, {PureComponent, Fragment} from 'react';
import SubTableGlecteurWithPh from './SubTableGlecteurWithPh'
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {handelExtentionPH} from '../functions/handelExtentionPH'
import DialogShowPH from './DialogShowPH'

class TableResultProfil extends PureComponent {

  constructor(props){
    super(props)
    this.state = {
      searchResult: null,
      open: false,
      body: [],
      nbPage: 1,
      selectedPage: 1,
      selectedVariable: null,
    }
    this.clickButtonVariableId = null
    this.variables = {}
  }

  componentDidMount(){
    this.props.HandelLoadingInProgress(false)
    this.handelVariables()
  }

  componentDidUpdate() {
    this.props.HandelLoadingInProgress(false)
    this.handelVariables()
  }

  generateTable = (data) => data.data.result.map((element) =>
       <CSSTransition key={element.id} timeout={500} classNames={'row-fade'}>
        <TableRow hover key={element.id}>
          <TableCell align={'left'} style={{width: '5%'}} className="font-weight-bold colorRed border-right">{element.id}</TableCell>
          <TableCell align={'left'} style={{width: '25%'}}>{element.nom}</TableCell>
          <TableCell align={'left'}style={{width: '25%'}}>{element.Description}</TableCell>
          <TableCell align={"right"}>{element.profilGlecteurVariable ?
            <SubTableGlecteurWithPh Id={"subTableBadgePh"} HandelClickLink={this.props.HandelClickLink} HandelClickOpenDialog={this.handelClickOpenDialog}
                                    ProfilGlecteurVariable={element.profilGlecteurVariable}/> : null}</TableCell>
        </TableRow>
      </CSSTransition>
  )

  handelVariables = () => {
    const variables = []
    this.props.SearchResult.data.result.map((profil) =>
      profil.profilGlecteurVariable.forEach((profilGlecteurVariable) => {
        variables[profilGlecteurVariable.variable.id] = handelExtentionPH(profilGlecteurVariable.variable)
      })
    )
    this.variables = variables

  }

  handleClose= () => {
    const open = false;
    this.setState({open})
  }

  handelClickOpenDialog = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation();
    const selectedVariable = this.variables[e.currentTarget.dataset.variableid]
    const open = true;
    this.setState({open, selectedVariable})
  }

  handleChangePage = (event, newPage) => {
    this.setState({selectedPage:newPage+1})
    this.props.HandelClickPage(newPage+1)
  };

  render() {
    console.log('render TableProfil')
    const resultPerPage = this.props.ResultPerPage
    return (
      <Fragment>
        <Paper>
          <TablePagination
            component={'div'}
            className={'d-block w-100'}
            rowsPerPageOptions={[15, 25, 35, 50]}
            onChangeRowsPerPage={this.props.HandelChangeRowsPerPage}
            colSpan={3}
            count={this.props.SearchResult.data.maxCount}
            rowsPerPage={resultPerPage}
            page={this.state.selectedPage-1}
            onChangePage={this.handleChangePage}
            SelectProps={{
              inputProps: { 'aria-label': 'résultats par page' },
              native: true,
            }}
          />
          <Table className="w-100">

            <TableHead>
              <TableRow>
                <TableCell className="font-weight-bold border-right" >ID</TableCell>
                <TableCell className="border-left">Nom</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Groupe de lecteur contenu dans ce profil d'accès</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              <TransitionGroup component={null}>
                {this.generateTable(this.props.SearchResult)}
              </TransitionGroup>
            </TableBody>
          </Table>
        </Paper>
        <DialogShowPH Variable={this.state.selectedVariable} Open={this.state.open} OnClose={this.handleClose}/>
      </Fragment>
    );
  }
}

export default TableResultProfil;