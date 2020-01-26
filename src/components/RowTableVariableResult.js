import React, {Component} from 'react';
import SubTableGlecteur from "./SubTableGlecteur";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';

class RowTableVariableResult extends Component {

  constructor(props){
    super(props)
    this.state = {
      show: false
    }
  }

  render () {
    return (
      <TableRow hover key={this.props.Variable.id}>
        <TableCell className="colorRed font-weight-bold text-center">{this.props.Variable.id}</TableCell>
        <TableCell className="border-left">{this.props.Variable.Nom}</TableCell>
        <TableCell className="">{this.props.Variable.description}</TableCell>
        <TableCell className="">{this.props.Variable.Nom.startsWith('PH.') ? <Chip style={{marginLeft: '10px'}} data-variableid={this.props.Variable.id} label="Voir" color="primary" clickable onClick={this.props.HandelClickOpenDialog} /> : null}</TableCell>
        <TableCell>{
          (this.props.Variable.glecteurs.length > 0 ? <SubTableGlecteur HandelClickLink={this.props.HandelClickLink} HandelClickOpenDialog={this.props.HandelClickOpenDialog} Glecteur={this.props.Variable.glecteurs}/> :
            (this.props.Variable.profilGlecteurVariable ? <SubTableGlecteur HandelClickLink={this.props.HandelClickLink} HandelClickOpenDialog={this.props.HandelClickOpenDialog} Glecteur={this.props.Variable.profilGlecteurVariable.map((element) => element.glecteur)} /> :
              null))
        }</TableCell>
      </TableRow>
    )
  }
}

export default RowTableVariableResult