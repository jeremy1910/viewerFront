import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

class SelecterSearch extends Component {

  state = {
    textField: null
  }

  render() {
    const required = !!this.props.RequiredInputSearch
    const disabled = !!this.props.DisabledInputSearch
    return (
      <div className={"col-md-4"}>
        <TextField
          id="inputSearch"
          label="Terme à rechercher"
          className={'w-100'}
          onChange={this.props.HandelChangeSearch}
          value={this.props.TextSearch}
          required={required}
          disabled={disabled}
        />
      </div>
    );
  }
}

export default SelecterSearch;