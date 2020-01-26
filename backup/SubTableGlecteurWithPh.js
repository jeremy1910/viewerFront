import React, {Component, Fragment} from 'react';
import Chip from '@material-ui/core/Chip';
// import Table from '@material-ui/core/Table';
import { Column, Table, AutoSizer } from 'react-virtualized';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'react-virtualized/styles.css';

class SubTableGlecteurWithPh extends Component {


    constructor(props){
        super(props)

    }
    // makeListGlecteur = (glecteurVariable) => {
    //
    //
    //     const glecteurId = []
    //
    //
    //     const tab = glecteurVariable.map((element, index) =>{
    //
    //         if (!glecteurId.find((id) => id === element.glecteur.id)){
    //             glecteurId.push(element.glecteur.id)
    //             const line = <TableRow hover key={element.glecteur.id} data-elementid={element.glecteur.id} data-element="glecteurs" onClick={this.props.HandelClickLink}>
    //                 <TableCell>{element.glecteur.id}</TableCell>
    //                 <TableCell>{element.glecteur.nom}</TableCell>
    //                 <TableCell>{element.glecteur.Description}</TableCell>
    //                 {element.variable ? <Fragment><TableCell>{element.variable.Nom}</TableCell><TableCell> <Chip style={{marginLeft: '10px'}} data-variableid={element.variable.id} label="Voir" color="primary" clickable onClick={this.props.HandelClickOpenDialog} /></TableCell></Fragment>: null}
    //             </TableRow>
    //             return line
    //
    //         }
    //         else{
    //             return null
    //         }
    //
    //
    //     })
    //
    //     return tab
    // }





    render() {



        return (
            <AutoSizer disableHeight>
                {({width }) => (

                    <Table
                        width={width}
                        height={200}
                        headerHeight={20}
                        rowHeight={30}
                        rowCount={this.props.ProfilGlecteurVariable.length}
                        rowGetter={({ index }) => <TableCell component="div" variant="body">{this.props.ProfilGlecteurVariable[index].glecteur}</TableCell>}

                    >

                        <Column label="Name" dataKey='id' width={200}/>
                        <Column label="Nom" dataKey='nom' width={200}/>
                        <Column label="description" dataKey='Description' width={200}/>
                    </Table>

                )}
            </AutoSizer>
        );

        // return (
        //     <Paper>
        //         <Table className="w-100">
        //             <TableHead>
        //                 <TableRow hover >
        //                     <TableCell className="font-weight-bold">ID</TableCell>
        //                     <TableCell className="font-weight-bold">Nom</TableCell>
        //                     <TableCell className="font-weight-bold">Description</TableCell>
        //                     <TableCell className="font-weight-bold">PH</TableCell>
        //                     <TableCell className="font-weight-bold">Action</TableCell>
        //                 </TableRow>
        //             </TableHead>
        //             <TableBody className="mdc-data-table__content">
        //                 {this.makeListGlecteur(this.props.ProfilGlecteurVariable)}
        //             </TableBody>
        //         </Table>
        //     </Paper>
        // );
    }
}

export default SubTableGlecteurWithPh;