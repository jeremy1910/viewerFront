import React, {Component} from 'react';

class Pagination extends Component {

  state = {
    pages : [],
    selectedPage : 1,
    nbPage: 0,
    htmlElements:null,
  }

  componentDidMount() {
    this.setState({nbPage: this.props.NbPage}, this.makeListPageToDisplay)

  }

  componentDidUpdate (prevProps, prevState) {

    if (this.props !== prevProps) {
      this.setState({nbPage: this.props.NbPage}, this.makeListPageToDisplay)
    }
    if (prevState.selectedPage !== this.state.selectedPage){
      this.makeListPageToDisplay()
    }
  }

  makeListPageToDisplay = () => {
    const selectedPage = this.state.selectedPage
    const pages = []

    for (let i = selectedPage + 7 ; i > selectedPage ; i--){
      if (i <= this.state.nbPage){
        pages.push(i)
      }
    }

    for (let i = selectedPage ; i > selectedPage - 7 ; i--){
      if (i > 0){
        pages.push(i)
      }
    }
    this.setState({pages},   this.makePagination)
  }

  handelClickNextPage = (e) => {
    e.preventDefault()
    if (this.state.selectedPage + 1 <= this.props.NbPage)
    {
      const selectedPage = this.state.selectedPage + 1
      this.setState({selectedPage}, this.workFlowWhenChangePage)
    }
  }

  handelClickPreviousPage = (e) => {
    e.preventDefault()
    if (this.state.selectedPage - 1 >= 1)
    {
      const selectedPage = this.state.selectedPage - 1
      this.setState({selectedPage}, this.workFlowWhenChangePage)
    }
  }

  handelClickPage = (e) => {
    e.preventDefault()
    const selectedPage = Number(e.target.innerHTML)
    this.setState({selectedPage}, this.workFlowWhenChangePage)
  }

  workFlowWhenChangePage = () => {
    this.resetActiveClassOnLi()
    this.setActiveClassOnLi()
    this.props.HandelClickPage(this.state.selectedPage)
  }

  resetActiveClassOnLi = () => {
    const liElementHtml = document.querySelectorAll(`.js-page-item-${this.props.SelectedElement}`)
    liElementHtml.forEach((element) => {
      element.classList.remove('active')
    })
  }

  setActiveClassOnLi = (e) => {
    const liElementHtml = document.querySelector(`.js-page-item-${this.props.SelectedElement}-${this.state.selectedPage}`)
    liElementHtml.classList.add('active')
  }

  makePagination = () => {
    const htmlElements = this.state.pages.reverse().map((pageNumber, index) => <li key={pageNumber} className={`page-item js-page-item-${this.props.SelectedElement} js-page-item-${this.props.SelectedElement}-${pageNumber}`}><button onClick={this.handelClickPage} className="page-link">{pageNumber}</button></li>)
    this.setState({htmlElements})
  }

  render() {
    if (this.props.SearchResult === null){
      return null
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item`} >
            <button onClick={this.handelClickPreviousPage} className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {this.state.htmlElements}
          <li className={`page-item`}>
            <button onClick={this.handelClickNextPage} className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>

        </ul>
      </nav>
    );
  }
}

export default Pagination;