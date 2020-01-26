import React, {PureComponent} from 'react';
import TableResultVariable from './TableResultVariable'
import TableResultGlecteur from './TableResultGlecteur'
import TableResultProfil from './TableResultProfil'
import TableResultBadge from './TableResultBadge'
import TableResultBadgeGlecteurVariable from './TableResultBadgeGlecteurVariable'
import {CSSTransition} from 'react-transition-group'

class TableResultHandler extends PureComponent {

  render() {
    console.log('render TableResultHandler')
    return (
      <div className={'w-75'}>
        { this.props.SelectedElement === 'variables' && this.props.SearchResult ? this.props.SearchResult.selectedElement === 'variables' ?  <CSSTransition  in={true} appear={true} timeout={500} classNames={'row-fade'}><TableResultVariable HandelChangeRowsPerPage={this.props.HandelChangeRowsPerPage} HandelLoadingInProgress={this.props.HandelLoadingInProgress} HandelClickPage={this.props.HandelClickPage} ResultPerPage={this.props.ResultPerPage} HandelClickLink={this.props.HandelClickLink}  SearchResult={this.props.SearchResult}/></CSSTransition>:null  : null}
        { this.props.SelectedElement === 'glecteurs' && this.props.SearchResult ? this.props.SearchResult.selectedElement === 'glecteurs' ? <CSSTransition  in={true} appear={true} timeout={500} classNames={'row-fade'}><TableResultGlecteur HandelChangeRowsPerPage={this.props.HandelChangeRowsPerPage} HandelLoadingInProgress={this.props.HandelLoadingInProgress} HandelClickPage={this.props.HandelClickPage} ResultPerPage={this.props.ResultPerPage} HandelClickLink={this.props.HandelClickLink} SearchResult={this.props.SearchResult} /></CSSTransition> :null : null}
        { this.props.SelectedElement === 'profils' && this.props.SearchResult ? this.props.SearchResult.selectedElement === 'profils' ? <CSSTransition  in={true} appear={true} timeout={500} classNames={'row-fade'}><TableResultProfil HandelChangeRowsPerPage={this.props.HandelChangeRowsPerPage} HandelLoadingInProgress={this.props.HandelLoadingInProgress} HandelClickPage={this.props.HandelClickPage} ResultPerPage={this.props.ResultPerPage} HandelClickLink={this.props.HandelClickLink} SearchResult={this.props.SearchResult}/></CSSTransition>: null : null}
        { this.props.SelectedElement === 'badges' && this.props.SearchResult ? this.props.SearchResult.selectedElement === 'badges' ? <CSSTransition  in={true} appear={true} timeout={500} classNames={'row-fade'}><TableResultBadge HandelChangeRowsPerPage={this.props.HandelChangeRowsPerPage} HandelLoadingInProgress={this.props.HandelLoadingInProgress} HandelClickPage={this.props.HandelClickPage} ResultPerPage={this.props.ResultPerPage} HandelClickLink={this.props.HandelClickLink} SearchResult={this.props.SearchResult}/></CSSTransition>: null : null}
        { this.props.SelectedElement === 'badgeGlecteurVariable' && this.props.SearchResult ? this.props.SearchResult.selectedElement === 'badgeGlecteurVariable' ? <CSSTransition  in={true} appear={true} timeout={500} classNames={'row-fade'}><TableResultBadgeGlecteurVariable HandelChangeRowsPerPage={this.props.HandelChangeRowsPerPage} HandelLoadingInProgress={this.props.HandelLoadingInProgress} HandelClickPage={this.props.HandelClickPage} ResultPerPage={this.props.ResultPerPage} HandelClickLink={this.props.HandelClickLink} SearchResult={this.props.SearchResult}/></CSSTransition>: null : null}
      </div>

    );
  }
}

export default TableResultHandler;