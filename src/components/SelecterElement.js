import React, {PureComponent, Fragment} from 'react';
import SelecterCategory from './SelecterCategory'
import SelecterInstallation from './SelecterInstallation'
import SelecterSearch from './SelecterSearch'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

class SelecterElement extends PureComponent {

  state={
    selectedInstallation: this.props.selectedInstallation,
  }

  render() {

    const disabledSearchButton = this.props.SelectedElement === ""
    console.log('render select Bar')
    return (
      <Fragment>
        <form className="w-100" onSubmit={this.props.HandelClickSearchButton} >
          <div className="row w-100">
            <SelecterInstallation SelectedElement={this.props.SelectedElement} HandelSelectChange={this.props.HandelSelectChange} DisabledSelect={this.props.DisabledSelect}/>
            <SelecterCategory SelectedCategory={this.props.SelectedCategory} SelectedElement={this.props.SelectedElement} HandelSelectCategory={this.props.HandelSelectCategory} DisabledSelect={this.props.DisabledSelect}/>
            <SelecterSearch  TextSearch={this.props.TextSearch} RequiredInputSearch={this.props.RequiredInputSearch} DisabledInputSearch={this.props.DisabledInputSearch} HandelChangeSearch={this.props.HandelChangeSearch}/>
            <Button type={'submit'} disabled={disabledSearchButton} variant="contained" color="primary" className="col-md-1">Rechercher</Button>
            <Button size="small" onClick={this.props.HandelClickOnReset} className={"ml-4 col-md-1"} disabled={disabledSearchButton} variant="outlined" color="primary" >Reset</Button>
            {this.props.LoadingInProgress ? <CircularProgress className={'ml-4'} disableShrink/> : null}
          </div>
        </form>
      </Fragment>
    );
  }
}

export default SelecterElement;