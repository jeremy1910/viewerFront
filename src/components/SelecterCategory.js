import React, {Component} from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class SelecterCategory extends Component {

  componentDidMount(){
    this.buildChoice()
  }

  componentDidUpdate(prevProps){
  }

  state={
    select: null,
    selectedElement: this.props.SelectedElement,
    choices: []
  }

  handelChange = (e) => {
    this.props.HandelSelectCategory(e.target.value);
  }

  buildChoice = () => {
    const choices = []
    choices['variables'] = [
      { value: 'ALL', text: 'Rechercher toute les variable' },
      { value: 'id', text: 'Rechercher une variable par ID' },
      { value: 'nom', text: 'Rechercher une varible par nom' },
      { value: 'description', text: 'Rechercher une variable par description' },
    ]
    choices['glecteurs'] = [
      { value: 'ALL', text: 'Rechercher tous les groupe de lecteur' },
      { value: 'id', text: 'Rechercher un groupe de lecteur par ID' },
      { value: 'nom', text: 'Rechercher un groupe de lecteur par nom' },
    ]
    choices['profils'] = [
      { value: 'ALL', text: 'Rechercher tous les profils' },
      { value: 'id', text: 'Rechercher un profil par ID' },
      { value: 'nom', text: 'Rechercher un profil par nom' },
    ]
    choices['badges'] = [
      { value: 'ALL', text: 'Rechercher tous les badges' },
      { value: 'id', text: 'Rechercher un badge par ID' },
      { value: 'nom', text: 'Rechercher un badge par nom' },
      { value: 'prenom', text: 'Rechercher un badge par prenom' },
      { value: 'code1', text: 'Rechercher un badge par description' },
    ]
    choices['badgeGlecteurVariable'] = [
      {value: 'ALL', text: 'Rechercher tous les droits individuel'},
      { value: 'id', text: 'Rechercher un badge par ID' },
      { value: 'nom', text: 'Rechercher un porteur par nom' },
      { value: 'prenom', text: 'Rechercher un badge par prenom' },
    ]
    this.setState({choices})

  }

  genOptions = () => {
    return this.state.choices[this.props.SelectedElement] ?  this.state.choices[this.props.SelectedElement].map((option, index) =>
      <MenuItem key={index} value={option.value}>
        {option.text}
      </MenuItem>
    ) : null
  }

  render() {
    const disabled = this.props.DisabledSelect ? true : false
    const options = this.genOptions()
    return (
      <div className={"col-md-2"}>
        <FormControl className={"w-100"}>
          <InputLabel id="demo-simple-select-label">Rechercher quoi ?</InputLabel>
          <Select
            id="selecterCategory"
            onChange={this.handelChange}
            disabled={disabled}
            value={this.props.SelectedCategory}
          >
            {options}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default SelecterCategory;