import React, {Component} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class SelecterInstallation extends Component {

  state={
    select: null,
  }

  handelChange = (e) => {
    this.props.HandelSelectChange(e.target.value);
  }

  render() {
    const disabled = !!this.props.DisabledSelect
    return (
      <div className={"offset-md-1 col-md-2"}>
        <FormControl className={"w-100"}>
          <InputLabel id="demo-simple-select-label">Type d'élément à chercher</InputLabel>
          <Select
            id="selectedInstallation"
            onChange={this.handelChange}
            disabled = {disabled}
            value={this.props.SelectedElement}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={"variables"}>Variables</MenuItem>
            <MenuItem value={"glecteurs"}>Groupe de lecteurs</MenuItem>
            <MenuItem value={"profils"}>Profils d'accès</MenuItem>
            <MenuItem value={"badges"}>Badges</MenuItem>
            <MenuItem value={"badgeGlecteurVariable"}>Droits individuel</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default SelecterInstallation;