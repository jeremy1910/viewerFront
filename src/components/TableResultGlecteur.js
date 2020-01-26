import React, {PureComponent, Fragment} from 'react';
import SubTableProfil from './SubTableProfil'
import SubTableVariable from './SubTableVariable'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import SubTableBadge from './SubTableBadge'


class TableResultGlecteur extends PureComponent {

  state = {
    searchResult: null,
    nbPage: 1,
    selectedElement: null,
    selectedPage: 1
  };

  componentDidUpdate() {

    this.props.HandelLoadingInProgress(false)
  };

  componentDidMount(){
    this.props.HandelLoadingInProgress(false)
  };



  generateTable = (data) => data.data.result.map((element) => {

      return data.data.result.length > 0 ?
        <CSSTransition key={element.id} timeout={500} classNames={'row-fade'}>
          <TableRow hover key={element.id}>
            <TableCell className="colorRed font-weight-bolder border-right">{element.id}</TableCell>
            <TableCell className={'font-weight-bolder'}>{element.nom}</TableCell>
            <TableCell>{element.Description}</TableCell>
            <TableCell>{element.Variable ? <SubTableVariable Id={'subTableVariable'} HandelClickLink={this.props.HandelClickLink} Variable={element.Variable}/> : null}</TableCell>
            <TableCell>{element.profilGlecteurVariable ? <SubTableProfil  Id={'subTableProfil'} HandelClickLink={this.props.HandelClickLink} Profil={element.profilGlecteurVariable.map((element)=>element.profil)}/>: null}</TableCell>
            <TableCell>{element.badgeGlecteurVariable ? <SubTableBadge HandelClickLink={this.props.HandelClickLink} Badge={element.badgeGlecteurVariable.map((element)=>element.badge)}/>: null}</TableCell>
          </TableRow>
        </CSSTransition>
        : null
    }
  );

  handleChangePage = (event, newPage) => {
    this.setState({selectedPage:newPage+1})
    this.props.HandelClickPage(newPage+1)
  };

  render() {
    console.log('render glecteur')
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
                <TableCell style={{width: '6%'}} className="font-weight-bold border-right">ID</TableCell>
                <TableCell style={{width: '10%'}}>Nom</TableCell>
                <TableCell style={{width: '10%'}} >Description</TableCell>
                <TableCell>Variables contenues dans ce groupe de lecteur</TableCell>
                <TableCell>Profil d'accès contenant ce groupe de lecteur</TableCell>
                <TableCell>Badge ayant ce groupe de lecteur</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TransitionGroup component={null}>
                {this.generateTable(this.props.SearchResult)}
              </TransitionGroup>
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  }
}

export default TableResultGlecteur;