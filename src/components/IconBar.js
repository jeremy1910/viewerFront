import React, {Component} from 'react';

class IconBar extends Component {
    render() {
        return (
            <div className="iconBar d-flex justify-content-around ">

                <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.4834 1H2.73328C1.38022 1 0.419797 2.31894 0.778388 3.62362C3.53267 13.6447 2.72748 20.2901 0.660679 28.4746C0.33852 29.7504 1.29307 31 2.60886 31H27.4517C28.7487 31 29.6997 29.7828 29.4134 28.5178C27.5523 20.2932 27.1606 14.3207 29.4549 3.45701C29.7208 2.19781 28.7703 1 27.4834 1Z" fill="#767572" stroke="#767572"/>
                </svg>

                <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="11" cy="8.27587" rx="8.88889" ry="8.27587" fill="#C4C4C4"/>
                    <path d="M21 30C21 13.4482 1 13.4484 1 30" stroke="#767572"/>
                </svg>


                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="14.5" fill="#C4C4C4" stroke="#767572"/>
                    <path d="M5 16.5C5 7.49999 13.5 8 13 16.5" stroke="#767572"/>
                    <path d="M17 23C17 13.402 25.4775 13.9352 24.9788 23" stroke="#767572"/>
                    <circle cx="9" cy="7" r="2.5" fill="#C4C4C4" stroke="#767572"/>
                    <circle cx="21" cy="13" r="2.5" fill="#C4C4C4" stroke="#767572"/>
                </svg>

                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31 31H1V4.5V1H31V4.5V31Z" fill="#C4C4C4"/>
                    <path d="M1 4.5V1H31V4.5M1 4.5V31H31V4.5M1 4.5H31M12.5 13L15.5 12V22H12.5H18.5" stroke="#767572"/>
                </svg>

                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="14.5" fill="#C4C4C4" stroke="#767572"/>
                    <path d="M13.4834 5H8.73328C7.38022 5 6.43317 6.3174 6.65685 7.65184C6.95491 9.43011 6.88053 10.9165 6.59729 12.4609C6.35993 13.7551 7.29307 15 8.60886 15H13.4517C14.7487 15 15.6792 13.7874 15.4796 12.5058C15.2333 10.925 15.2118 9.43999 15.5139 7.47003C15.7091 6.19793 14.7703 5 13.4834 5Z" fill="#767572" stroke="#767572"/>
                    <path d="M22.4834 15H17.7333C16.3802 15 15.4332 16.3174 15.6568 17.6518C15.9549 19.4301 15.8805 20.9165 15.5973 22.4609C15.3599 23.7551 16.2931 25 17.6089 25H22.4517C23.7487 25 24.6792 23.7874 24.4796 22.5058C24.2333 20.925 24.2118 19.44 24.5139 17.47C24.7091 16.1979 23.7703 15 22.4834 15Z" fill="#767572" stroke="#767572"/>
                </svg>

            </div>
        );
    }
}

export default IconBar;