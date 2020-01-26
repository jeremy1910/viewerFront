import React, {Component} from 'react';


class SubTableVariablePh extends Component {
    render() {
        console.log(this.props.Variable)
        return (
            <div className="mdc-data-table">
                <table className="mdc-data-table__table" aria-label="Dessert calories">
                    <thead>
                    <tr className="mdc-data-table__header-row">
                        <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Jour</th>
                        <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Autorisation</th>
                    </tr>
                    </thead>
                    <tbody className="mdc-data-table__content">
                    <tr className="mdc-data-table__row">
                        <td className="mdc-data-table__cell">Dimanche</td>
                        <td className="mdc-data-table__cell">
                        </td>
                    </tr>
                    <tr className="mdc-data-table__row">
                        <td className="mdc-data-table__cell">Lundi</td>
                        <td className="mdc-data-table__cell"></td>
                    </tr>
                   <tr className="mdc-data-table__row">
                        <td className="mdc-data-table__cell">Mardi</td>
                        <td className="mdc-data-table__cell"></td>
                    </tr>
                   <tr className="mdc-data-table__row">
                        <td className="mdc-data-table__cell">Mercredi</td>
                        <td className="mdc-data-table__cell"></td>
                    </tr>
                   <tr className="mdc-data-table__row">
                        <td className="mdc-data-table__cell">Jeudi</td>
                        <td className="mdc-data-table__cell"></td>
                    </tr>
                   <tr className="mdc-data-table__row">
                        <td className="mdc-data-table__cell">Vendredi</td>
                        <td className="mdc-data-table__cell"></td>
                    </tr>
                   <tr className="mdc-data-table__row">
                        <td className="mdc-data-table__cell">Samedi</td>
                        <td className="mdc-data-table__cell"></td>
                    </tr>

                    </tbody>
                </table>
            </div>
        );
    }
}

export default SubTableVariablePh;