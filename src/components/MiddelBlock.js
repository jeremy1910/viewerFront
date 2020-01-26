import React, {Component, Fragment} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import {CSSTransition} from 'react-transition-group'


class MiddelBlock extends Component {

  componentDidMount(){
    this.props.SetResultPannelID(document.querySelector('#resultPannelID'))
  }

  render() {
    return (

      <Fragment>
        <CSSTransition in={this.props.ReduceMenu} classNames={'littelMenu'} timeout={500} >
          <div id={'resultPannelID'} className="row mr-0 ml-0 middelBlock">
            <BottomNavigation className={'w-100 h-100'} showLabels>
              <BottomNavigationAction onClick={this.props.HandelOpenDialogAddInstallation} style={{maxWidth: 'none'}}  label="Ajouter une installation" icon={<AddIcon style={{width: '100px', height: '100px'}} fontSize={"large"} color={"primary"}/>} />
              <BottomNavigationAction onClick={this.props.displayChoiceInstallationDialog} style={{maxWidth: 'none', fontSize: '8rem'}} label="Ouvrir une installation" icon={<FolderOpenIcon style={{width: '100px', height: '100px'}} fontSize={"large"} color={"primary"}/>} />
              <BottomNavigationAction onClick={this.props.HandelOpenUpadteInstallationDialog} style={{maxWidth: 'none'}} label="Mettre à jour une installation" icon={<SystemUpdateAltIcon style={{width: '100px', height: '100px'}} fontSize={"large"} color={"primary"} />} />
            </BottomNavigation>
          </div>
        </CSSTransition>
      </Fragment>
    );
  }
}

export default MiddelBlock;