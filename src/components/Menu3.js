import React, {Component} from 'react';

class Menu3 extends Component {
    render() {
        return (
            <div className='menu d-flex flex-column justify-content-center bgMenu shadowMenu'>
                <button className="mdc-button w-75 mr-auto ml-auto mb-2  pb-4 pt-4">Mettre à jour une installation</button>
                <svg className="mr-auto ml-auto" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.2771 29.0698V0L25.3012 1.74419L31.3253 0V29.0698H50L25.3012 50L0 29.0698H19.2771Z" fill="#EF6461"/>
                </svg>

            </div>
        );
    }
}

export default Menu3;