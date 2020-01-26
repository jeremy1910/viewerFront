import React, {Component, Fragment} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import VirtualizedTable from './VirtualizedTable'
import $ from 'jquery'


class SubTableProfil extends Component
{

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      profils: null,
      width: null,
    }
  }

  componentDidMount(){
    const width = this.parentDiv.offsetWidth
    this.setState({width});
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
    const profils = []
    this.props.Profil.forEach((element) => {
      const concatenedproperties = element.id+' '+element.nom+' '+element.Description
      if (concatenedproperties.search(this.state.searchValue) !== -1){
        profils.push(element)
      }
    })
    this.setState({profils})
  }

  calcWidthCol = (ratio) => {
    return (this.state.width / 12) * ratio
  }

  render (){
    const list = this.state.profils ?  this.state.profils : this.props.Profil
    const height = list.length > 10 ? 500 : (50 * list.length)+50
    return(
      <div ref = {c => this.parentDiv = c}>
        <Paper>
          <TextField value={this.state.searchValue} onChange={this.handelChange} className={'ml-4'}  label="Rechercher" />
        </Paper>
        <Paper style={{height: height, width: '100%'}}>
          {this.state.width ?
          <VirtualizedTable
            rowCount={list.length}
            rowGetter={({index}) => {
              return {profilsID : list[index].id, profilsNom :  list[index].nom}

            }}
            eventHandlerOnRowClick={this.props.HandelClickLink}
            dataElement={"profils"}
            columns={[
              {
                width: this.calcWidthCol(0),
                dataKey: 'profilsID',
                style: {display: 'none'}
              },
              {
                width: this.calcWidthCol(12),
                label: 'Nom',
                dataKey: 'profilsNom',

              },
            ]}
          /> : null}

        </Paper>
      </div>
    )
      ;
  }
}

export default SubTableProfil