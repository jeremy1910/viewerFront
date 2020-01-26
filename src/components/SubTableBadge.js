import React, { PureComponent, Fragment } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import VirtualizedTable from './VirtualizedTable'



class SubTableBadge extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      badge: null,
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
    const badge = []
    this.props.Badge.forEach((element) => {
      const concatenedproperties = element.id+' '+element.nom+' '+element.code1
      if (concatenedproperties.search(this.state.searchValue) !== -1){
        badge.push(element)
      }
    })
    this.setState({badge})
  }

  calcWidthCol = (ratio) => {
    return (this.state.width / 12) * ratio
  }

  render (){
    const list = this.state.badge ? this.state.badge : this.props.Badge
    console.log('subTableBadge')
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
                return {badgeID : list[index].id, badgeNom :  list[index].nom,  badgePrenom: list[index].prenom}
              }}
              eventHandlerOnRowClick={this.props.HandelClickLink}
              dataElement={"badges"}
              columns={[
                {
                  width: this.calcWidthCol(0),
                  dataKey: 'badgeID',
                  style: {display: 'none'}
                },
                {
                  width: this.calcWidthCol(6),
                  label: 'Nom',
                  dataKey: 'badgeNom',
                },
                {
                  width: this.calcWidthCol(6),
                  label: 'Prenom',
                  dataKey: 'badgePrenom',
                },
              ]}
            />
            : null}

        </Paper>
      </div>
    );
  }
}

export default SubTableBadge