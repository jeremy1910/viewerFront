import React, {Component} from 'react';

class Menu2 extends Component {
    render() {
        return (
            <div className='menu d-flex flex-column justify-content-center bgMenu shadowMenu'>
                <button className="mdc-button w-75 mr-auto ml-auto mb-2  pb-4 pt-4">Ouvrir une installation</button>
                <svg className="mr-auto ml-auto" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 50H0V22.6316V18.4211V0H17.8295L22.093 5.78947H50V18.4211V22.6316V50Z" fill="#E4B363"/>
                    <path d="M1.93798 20H48.8372" stroke="#AB880F"/>
                    <path d="M2.32558 10.5263V18.9474H48.062V10.5263H2.32558Z" fill="#F0F0F0" stroke="#D9D9D9"/>
                </svg>


            </div>
        );
    }
}

export default Menu2;