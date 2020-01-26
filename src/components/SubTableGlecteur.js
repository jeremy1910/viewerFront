import React, {Component, Fragment} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import VirtualizedTable from './VirtualizedTable'


class SubTableGlecteur extends Component
{

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      glecteur: null,
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
    const glecteur = []
    this.props.Glecteur.forEach((element) => {
      const concatenedproperties = element.id+' '+element.nom+' '+element.Description
      if (concatenedproperties.search(this.state.searchValue) !== -1){
        glecteur.push(element)
      }
    })

    this.setState({glecteur})
  }
  calcWidthCol = (ratio) => {
    return (this.state.width / 12) * ratio
  }

  render (){


    if (this.props.Glecteur.length <= 0){
      return null
    }
    const list = this.state.glecteur ?  this.state.glecteur : this.props.Glecteur

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
              return {glecteurID : list[index].id, glecteurNom :  list[index].nom,  glecteurDescription: list[index].Description}

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
                width: this.calcWidthCol(6),
                label: 'Description',
                dataKey: 'glecteurDescription',

              },


            ]}
          />
        </Paper>
      </div>
    )
      ;
  }
}

export default SubTableGlecteur