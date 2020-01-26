import React, { PureComponent, Fragment } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import SubTableGlecteurWithPh from './SubTableGlecteurWithPh'
import { handelExtentionPH } from '../functions/handelExtentionPH'
import DialogShowPH from './DialogShowPH'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

class TableResultBadgeGlecteurVariable extends PureComponent {
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
    this.variables = {}
  }

  componentDidUpdate() {
    this.props.HandelLoadingInProgress(false)
    this.handelVariables()
  };

  componentDidMount(){
    this.props.HandelLoadingInProgress(false)
    this.handelVariables()
  };

  generateTable = (data) => data.data.result.map((element) =>

      <CSSTransition key={element.id} timeout={500} classNames={'row-fade'}>
        <TableRow hover key={element.id}>
          <TableCell className="colorRed font-weight-bolder border-right">{element.id}</TableCell>
          <TableCell className={'font-weight-bolder'}>{element.nom}</TableCell>
          <TableCell className={'font-weight-bolder'}>{element.prenom}</TableCell>
          <TableCell className={'font-weight-bolder'}>{element.code1}</TableCell>
          <TableCell>
            <SubTableGlecteurWithPh Id={"subTableBadgePh"} HandelClickLink={this.props.HandelClickLink} HandelClickOpenDialog={this.handelClickOpenDialog}
                                    ProfilGlecteurVariable={element.badgeGlecteurVariable}/>
          </TableCell>
        </TableRow>
      </CSSTransition>
    );

  handelVariables = () => {
    const variables = []
    this.props.SearchResult.data.result.map((profil) =>
      profil.badgeGlecteurVariable.forEach((badgeGlecteurVariable) => {
        variables[badgeGlecteurVariable.variable.id] = handelExtentionPH(badgeGlecteurVariable.variable)
      })
    )
    this.variables = variables
  }

  handelClickOpenDialog = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation();
    const selectedVariable = this.variables[e.currentTarget.dataset.variableid]
    const open = true;
    this.setState({open, selectedVariable})
  }

  handleClose= () => {
    const open = false;
    this.setState({open})
  }
  handleChangePage = (event, newPage) => {
    this.setState({selectedPage:newPage+1})
    this.props.HandelClickPage(newPage+1)
  };

  render () {
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
              <TableRow hover>
                <TableCell className="font-weight-bold border-right">ID</TableCell>
                <TableCell>Nom du porteur</TableCell>
                <TableCell>Prénom du porteur</TableCell>
                <TableCell>Numero du badge</TableCell>
                <TableCell>Groupe de lecteur avec plage horraire associé</TableCell>
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
    )
  }
}

export default TableResultBadgeGlecteurVariable