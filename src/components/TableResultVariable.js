import React, {PureComponent, Fragment} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {handelExtentionPH} from '../functions/handelExtentionPH'
import DialogShowPH from './DialogShowPH'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import RowTableVariableResult from './RowTableVariableResult'

class TableResultVariable extends PureComponent {
  state = {
    searchResult: null,
    nbPage: 1,
    selectedElement: null,
    selectedPage: 1,
    selectedVariable: null,
    open: false,
    show: false,
  }
  variables = {}

  componentDidUpdate() {
    this.props.HandelLoadingInProgress(false)
    this.handelVariables()
    this.setState({show: true})
  }

  componentDidMount(){
    this.props.HandelLoadingInProgress(false)
    this.handelVariables()
    this.setState({show: true})
  }

  handelVariables = () => {
    const variables = []
    this.props.SearchResult.data.result.map((variable) =>{
        return variable.Nom.startsWith('PH.') ? variables[variable.id] = handelExtentionPH(variable) : null
      }
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

  generateTable = (data) =>
    data.data.result.map((variable) =>
      <CSSTransition key={variable.id} timeout={500} classNames={'row-fade'}>
        <RowTableVariableResult Variable={variable} HandelClickLink={this.props.HandelClickLink} HandelClickOpenDialog={this.handelClickOpenDialog} />
      </CSSTransition>
    )


  handleChangePage = (event, newPage) => {
    this.setState({selectedPage:newPage+1})
    this.props.HandelClickPage(newPage+1)
    this.setState({show:false})
  };

  render() {
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
                  <TableCell style={{width: '5%'}} className="font-weight-bold">ID</TableCell>
                  <TableCell style={{width: '10%'}} className="border-left">Nom</TableCell>
                  <TableCell style={{width: '25%'}} >Description</TableCell>
                  <TableCell style={{width: '10%'}}>Action</TableCell>
                  <TableCell className="text-center">Groupe de lecteur contenant cette variable</TableCell>
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

export default TableResultVariable;