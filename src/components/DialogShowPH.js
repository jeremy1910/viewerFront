import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';

class DialogShowPh extends Component {

	constructor(props){
		super(props)
		this.hebdo = {1440: 'dimanche', 2880 : 'Lundi', 4320: 'Mardi', 5760: 'Mercredi', 7200: 'Jeudi', 8640: 'Vendredi', 10080: "Samedi"}
	}

	handleClose= () => {
		const open = false;
		this.setState({open})
	}

	makeTableHead = () => {
		let cells = [];
		cells.push(<TableCell key={'_' + Math.random().toString(36).substr(2, 9)} style={{borderRight: '1px solid rgb(224, 224, 224)'}}> Jour </TableCell>)
		for (let i=0; i<24; i++){
			cells.push(<TableCell key={'_' + Math.random().toString(36).substr(2, 9)} style={{borderRight: '1px solid rgb(224, 224, 224)', minWidth: "60px"}}>{i+'H'}</TableCell>)
		}
		return cells
	}

	makeTableBody = () => {
		let tab = JSON.parse(JSON.stringify(this.props.Variable.extension));
		console.log(tab)
		let jours = []
		let heures = []
		for (let i = 60; i<= 10080; i += 60) {
			let widthHour = 60
			let divs = []
			while (widthHour > 0) {
				let widthElement = 0;
				if (tab[0].length <= widthHour) {
					widthElement = tab[0].length;
					widthHour -= widthElement;
					tab[0].length -= widthElement;
				}
				else {
					widthElement = widthHour
					widthHour = 0
					tab[0].length -= widthElement;
				}
				divs.push(<div key={'_' + Math.random().toString(36).substr(2, 9)} className={ tab[0].type === 1 ? 'bgBlue' : 'bgRed' } style={{
					width: widthElement + 'px',
					height: "20px",
				}}><Fragment/></div>)
				if (tab[0].length <= 0) {

					tab.shift()
				}
			}
			heures.push(<TableCell key={'_' + Math.random().toString(36).substr(2, 9)} style={{borderRight: '1px solid rgb(224, 224, 224)', paddingRight: "0px", paddingLeft: "0px"}}><div className={"d-flex"}>{divs.map((element) => element)}</div></TableCell>)
			if (i % 1440 === 0) {
				jours.push(<TableRow key={'_' + Math.random().toString(36).substr(2, 9)}><TableCell style={{borderRight: '1px solid rgb(224, 224, 224)'}}> {this.hebdo[i]} </TableCell>{heures.map((element) => element)}</TableRow>)
				heures = []
			}
		}
		return jours
	}

	render() {

		return (
			<Dialog fullWidth={true} maxWidth={"xl"}  open={this.props.Open} onClose={this.props.OnClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Calendier</DialogTitle>
				<DialogContent>
					<Paper>
						<Table>
							<TableHead>
								<TableRow>
									{this.props.Open ? this.makeTableHead() : null}
								</TableRow>
							</TableHead>
							<TableBody>
								{this.props.Open && this.props.Variable ? this.makeTableBody() : null}
							</TableBody>
						</Table>
					</Paper>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.OnClose} color="primary">
						Fermer
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default DialogShowPh;