import React, {Fragment} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import {CSSTransition} from 'react-transition-group'

const NavBar = ({ServerURL, HandelOpenDialogChangeServerURL, APIOnline, ReduceMenu, OnClickAddInstallation, OnClickOpenInstallation, OnClickUpdateInstallation}) => {
  const styles = {
    isOnlineStyle : {
      color: '#FFF',
      backgroundColor: APIOnline ? '#47931a' : '#d50000',
      padding: '0.25rem',
      fontWeight: 'bold',
      borderRadius: '10px'
    }
  }

  return (
    <Fragment>
      <div className='custom_navBar shadowMenu sticky-top d-flex'>
        <CSSTransition in={ReduceMenu} classNames={'navLittelMenu'} timeout={500} >
          <div className={'d-flex menuNavBar'}>
            <BottomNavigationAction  onClick={OnClickAddInstallation} style={{maxWidth: 'none'}}   icon={<AddIcon style={{width: '25px', height: '25px'}} fontSize={"large"} color={"primary"}/>} />
            <BottomNavigationAction  onClick={OnClickOpenInstallation} style={{maxWidth: 'none', fontSize: '8rem'}}  icon={<FolderOpenIcon style={{width: '25px', height: '25px'}} fontSize={"large"} color={"primary"}/>} />
            <BottomNavigationAction  onClick={OnClickUpdateInstallation} style={{maxWidth: 'none'}} icon={<SystemUpdateAltIcon style={{width: '25px', height: '25px'}} fontSize={"large"} color={"primary"} />} />
          </div>
        </CSSTransition>
        <CSSTransition in={ReduceMenu} classNames={'navTitelAnim'} timeout={500}>
          <h5 className='mb-0 text-white align-self-center text-center navTitel'>APP Viewer</h5>
        </CSSTransition>
        <p className='mb-0 small text-white text-right align-self-center mr-4 ml-auto'>Adresse du serveur API : http://<span style={{fontWeight: 'bold'}}>{ServerURL}</span>/api<EditIcon onClick={HandelOpenDialogChangeServerURL} style={{width: '1rem', height: '1rem', marginLeft: '5px'}} fontSize={"large"} color={"primary"}/><span style={styles.isOnlineStyle}>{APIOnline ? 'ON' : 'OFF'}</span></p>
      </div>
    </Fragment>
  );
};

export default NavBar;
