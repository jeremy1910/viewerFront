import React, {Component, Fragment} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import VirtualizedTable from './VirtualizedTable'
import $ from 'jquery'


class SubTableGlecteurWithPh extends Component
{

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      profilGlecteurVariable: null,
      width: null,
    }

  }

  componentDidMount(){
    if(this.parentDiv) {
      const width = this.parentDiv.offsetWidth
      this.setState({width});
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.searchValue !== this.state.searchValue){
      this.changeListOnSearch()
    }
  }

  handelChange = (e) => {
    const searchValue = e.target.value
    this.setState({searchValue})
  }

  changeListOnSearch = () => {
    const profilGlecteurVariable = []
    this.props.ProfilGlecteurVariable.forEach((element) => {
      const concatenedproperties = element.glecteur.id+' '+element.glecteur.nom+' '+element.glecteur.Description.search
      if (concatenedproperties.search(this.state.searchValue) !== -1){
        profilGlecteurVariable.push(element)
      }
    })
    console.log(profilGlecteurVariable)
    this.setState({profilGlecteurVariable})
  }

  calcWidthCol = (ratio) => {
    return (this.state.width / 12) * ratio
  }

  render (){
    const list = this.state.profilGlecteurVariable ?  this.state.profilGlecteurVariable : this.props.ProfilGlecteurVariable
    const height = list.length > 10 ? 500 : (50 * list.length)+50
    return(
      <div ref = {c => this.parentDiv = c}>
        <Paper>
          <TextField value={this.state.searchValue} onChange={this.handelChange} className={'ml-4'}  label="Rechercher" />
        </Paper>
        <Paper style={{height: height, width: '100%'}}>
          <VirtualizedTable
            rowCount={list.length}
            rowGetter={({index}) => {
              return {glecteurID : list[index].glecteur.id,glecteurNom :  list[index].glecteur.nom, variableName: list[index].variable.Nom, button: <Chip style={{marginLeft: '10px'}} data-variableid={list[index].variable.id} label="Voir" color="primary" clickable onClick={this.props.HandelClickOpenDialog} />}
            }}
            eventHandlerOnRowClick={this.props.HandelClickLink}
            dataElement={"glecteurs"}
            columns={[
              {
                width: this.calcWidthCol(0),
                dataKey: 'glecteurID',
                style: {display: 'none'}
              },
              {
                width: this.calcWidthCol(6),
                label: 'Nom',
                dataKey: 'glecteurNom',
              },
              {
                width: this.calcWidthCol(3),
                label: 'PH',
                dataKey: 'variableName',

              },
              {
                width: this.calcWidthCol(3),
                label: 'Action',
                dataKey: 'button',
              },
            ]}
          />
        </Paper>
      </div>
    )
      ;
  }
}

export default SubTableGlecteurWithPh