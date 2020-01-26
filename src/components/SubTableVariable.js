import React, {Component, Fragment} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import VirtualizedTable from './VirtualizedTable'

import $ from 'jquery'


class SubTableVariable extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      variables: null,
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
    const variables = []
    this.props.Variable.forEach((element) => {
      const concatenedproperties = element.id+' '+element.nom+' '+element.Description
      if (concatenedproperties.search(this.state.searchValue) !== -1){
        variables.push(element)
      }
    })

    this.setState({variables})
  }


  calcWidthCol = (ratio) => {
    return (this.state.width / 12) * ratio
  }

  render (){

    const list = this.state.variables ?  this.state.variables : this.props.Variable
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
              return {variableID : list[index].id, variableNom :  list[index].Nom}

            }}
            eventHandlerOnRowClick={this.props.HandelClickLink}
            dataElement={"variables"}
            columns={[
              {
                width: this.calcWidthCol(0),
                dataKey: 'variableID',
                style: {display: 'none'}
              },
              {
                width: this.calcWidthCol(12),
                label: 'Nom',
                dataKey: 'variableNom',
              },
            ]}
          />
            : null}
        </Paper>
      </div>
    )
      ;
  }
}

export default SubTableVariable