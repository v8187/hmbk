(((R, RD) => {
	
const 	
	ce = R.createElement,
	RC = React.Component,
		
	_renderRows = (data, onRemove) => {
			
			return data.map((item, indx) => {
				item.key = item.id = indx;
				item.onRemove = onRemove;
				return ce(FormRow, item);
			});
		}
;

class FormRow extends RC {
		
	constructor(props) {
		
		super(props);
		
		this.remove = this.remove.bind(this);
	}
	
	remove(evt) {
		
		evt.preventDefault();
		evt.stopPropagation();
		this.props.onRemove(this.props.id);
	}
	
	render() {
		
		return ce('fieldset', { className: 'inputs-row', ref: fieldset => {this.node = fieldset} },
			(this.props.removable && ce('input', {type: 'button', value: 'X', className: 'btn-general', onClick: this.remove})),
			ce('input', { 
				placeholder: 'Spent by', 
				type: 'text',
				required: true,
				title: 'Who spent?',
				value: this.props.spentBy }),
			ce('input', { 
				placeholder: 'Spent for', 
				type: 'text',
				required: true,
				title: 'Enter expenses done for?',
				value: this.props.spentOn }),
			ce('input', { 
				placeholder: 'Amount', 
				type: 'text',
				min: 0,
				max: 50000,
				pattern: '^\\d{1,5}(\\.\\d{1,2})?$', 
				required: true,
				title: 'How much was spent?',
				value: this.props.amount })
		);
	}
}

class App extends RC {
	
	constructor(props) {
	
    	super(props);
    	
    	this.state = {
    		data: [
    			{ spentBy: '', spentOn: '', amount: 0.00, removable: false }
				, { spentBy: '', spentOn: '', amount: 0.00, removable: false }
				, { spentBy: '', spentOn: '', amount: 0.00, removable: false }
				, { spentBy: '', spentOn: '', amount: 0.00, removable: true }
				, { spentBy: '', spentOn: '', amount: 0.00, removable: true }
    		]
    	};
    	
    	this.calc = this.calc.bind(this);
    	this.addRow = this.addRow.bind(this);
    	this.delRow = this.delRow.bind(this);
	}
	
	addRow(evt) {
		
		evt.preventDefault();
		evt.stopPropagation();
		
		this.setState({
			data: this.state.data.concat({ id: this.state.data.length, spentBy: '', spentOn: '', amount: 0.00, removable: true })
		});
	}
	
	delRow(id) {
		
		this.state.data.splice(id, 1);
		
		this.setState({
			data: this.state.data
		});
	}
	
	calc(evt) {
		
		//evt.preventDefault();
		//evt.stopPropagation();
	}
	
	render() {
		
		return (
			// Main Wrapper
			ce('div', { id: 'appWrapper' },
				ce('h1', null, 'Hisaab Kitab'),
				ce('div', {id: 'contentSection'},
					ce('h2', {}, 'Type in expenses details...'),
					ce('form', {name: 'mainForm', id: 'mainForm', onSubmit: this.calc},
						ce('div', { className: 'fields-wrapper'},
							ce('div', { className: 'fields-wrapper-inner'},
								_renderRows(this.state.data, this.delRow)
							)
						),
						ce('div', {id: 'bottomBar'},
							ce('input', {type: 'button', id: 'btnNewRow', value: '+', className: 'btn-general', onClick: this.addRow}),
							ce('input', {type: 'submit', id: 'btnCalc', value: 'Calculate', className: 'btn-primary'})
						)
					)
				)
			)
		);
	}
}

console.log(new App());

RD.render(ce(App), document.getElementById('root'));
	
})(React, ReactDOM));
