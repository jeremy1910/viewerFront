import React, {Component} from 'react';

class Menu1 extends Component {
    render() {
        return (
            <div className='menu d-flex flex-column justify-content-center bgMenu shadowMenu '>
                <button className="mdc-button w-75 mr-auto ml-auto mb-2  pb-4 pt-4">Ajouter une installation</button>
                <svg className="mr-auto ml-auto" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 16.8224V1C16.6667 0.447715 17.1144 0 17.6667 0H25H32.3333C32.8856 0 33.3333 0.447715 33.3333 1V16.8224H49C49.5523 16.8224 50 17.2701 50 17.8224V25.2336V31.7103C50 32.2626 49.5523 32.7103 49 32.7103H33.3333L33.1113 49.0136C33.1038 49.5605 32.6583 50 32.1114 50H25H17.6667C17.1144 50 16.6667 49.5523 16.6667 49V32.7103H1C0.447715 32.7103 0 32.2626 0 31.7103V24.7664V17.8224C0 17.2701 0.447714 16.8224 0.999999 16.8224H16.6667Z" fill="#54B85E"/>
                </svg>

            </div>
        );
    }
}

export default Menu1;