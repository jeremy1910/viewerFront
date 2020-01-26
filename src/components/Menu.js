import React, {Component, Fragment} from 'react';
import MenuTrapezLeft from './MenuTrapezLeft'
import MenuTrapezRight from './MenuTrapezRight'

class Menu extends Component {
    render() {
        return (
            <Fragment>
                <div className="row menu flex-nowrap">
                    <div className="col-md-6 bgPurple flex-shrink-1 d-flex flex-column justify-content-center">
                        <h1 className="text-center display-5 text_light ">Nouvelle installation</h1>
                    </div>
                    <MenuTrapezLeft/>
                    <MenuTrapezRight/>
                    <div className="col-md-3 bgRed flex-shrink-1 d-flex flex-column justify-content-center" >
                        <h1 className="text-center display-5 text_light ">Ouvrir</h1>
                    </div>
                    <div className="col-md-3 bgOrange flex-shrink-1 d-flex flex-column justify-content-center">
                        <h1 className="text-center display-5 text_light ">Mise à jour</h1>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Menu;