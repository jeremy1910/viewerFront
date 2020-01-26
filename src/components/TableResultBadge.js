import React, {PureComponent, Fragment} from 'react';
import SubTableProfil from './SubTableProfil'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {TransitionGroup, CSSTransition} from 'react-transition-group'

class TableResultBadge extends PureComponent {
  state = {
    searchResult: null,
    nbPage: 1,
    selectedElement: null,
    selectedPage: 1
  }

  styles = {
    widthSubTableProfil : {
      width: "400px"
    }
  }

  componentDidMount(){
    this.props.HandelLoadingInProgress(false)
  }

  componentDidUpdate() {
    this.props.HandelLoadingInProgress(false)
  }

  handleChangePage = (event, newPage) => {
    this.setState({selectedPage:newPage+1})
    this.props.HandelClickPage(newPage+1)
  };


  generateTable = (data) => {
    return data.data.result.map((element) =>
      <CSSTransition key={element.id} timeout={500} classNames={'row-fade'}>
        <TableRow hover key={element.id} >
          <TableCell className="colorRed border-right font-weight-bold">{element.id}</TableCell>
          <TableCell>{element.matricule}</TableCell>
          <TableCell>{element.nom}</TableCell>
          <TableCell>{element.prenom}</TableCell>
          <TableCell>{new Date(element.dateCreation).toLocaleString()}</TableCell>
          <TableCell>{new Date(element.dateDebVal).toLocaleString()}</TableCell>
          <TableCell>{new Date(element.dateFinVal).toLocaleString()}</TableCell>
          <TableCell>{new Date(element.dateDebVal2).toLocaleString()}</TableCell>
          <TableCell>{new Date(element.dateFinVal2).toLocaleString()}</TableCell>
          <TableCell>{element.valide ? 'VRAI' : 'FAUX'}</TableCell>
          <TableCell>{element.code1}</TableCell>
          <TableCell>{element.profil ? <SubTableProfil HandelClickLink={this.props.HandelClickLink} Profil={element.profil}/> : null}</TableCell>
        </TableRow>
      </CSSTransition>
    )
  }


  render() {
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
            rowsPerPage={25}
            page={this.state.selectedPage-1}
            onChangePage={this.handleChangePage}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}

          />
          <Table className="w-100">

            <TableHead>
              <TableRow hover >
                <TableCell className="font-weight-bold border-right">ID</TableCell>
                <TableCell className="font-weight-bold">Matricule</TableCell>
                <TableCell className="font-weight-bold">Nom</TableCell>
                <TableCell className="font-weight-bold">Prenom</TableCell>
                <TableCell className="font-weight-bold">date debugger création</TableCell>
                <TableCell className="font-weight-bold">Debut de validité</TableCell>
                <TableCell className="font-weight-bold">Fin de validité</TableCell>
                <TableCell className="font-weight-bold">Debut de validité 2</TableCell>
                <TableCell className="font-weight-bold">Fin de validité 2</TableCell>
                <TableCell className="font-weight-bold">Valide</TableCell>
                <TableCell className="font-weight-bold">Numero de badge</TableCell>
                <TableCell style={this.styles.widthSubTableProfil} className="font-weight-bold">profils d'accès</TableCell>
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

export default TableResultBadge;