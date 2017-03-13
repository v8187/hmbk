(((R, RD) => {
	
const ce = R.createElement,
		
		/* Helper methods to various sections (DOM partials) of App
		 * just to keep the code clearner 
		 */
		_renderHeader = () => {
			return ce('h1', null, 'Hisaab Kitab');
		},
		_renderWizardNav = () => {
			return ce('nav', { id: 'wizardSteps' },
						ce('ul', null,
							ce('li', null, ce('a', { className: 'active' }, 'Buddies')),
							ce('li', null, ce('a', null, 'Spendings')),
							ce('li', null, ce('a', null, 'Spenders'))
						)
						
					);
		},
		_renderTextInput = (placeholder1, placeholder2) => {
			
			let = clas1 = placeholder2 ? 'has-amount' : '';
			
			return ce('div', { className: 'inputs-row' },
						ce('input', { placeholder: placeholder1, type: 'text', className:  clas1 }),
						(placeholder2 && ce('input', { placeholder: placeholder2, type: 'text', className: 'amount' }))
					);
		},
		_renderForm = (id, title, btnId, addBtnId, placeholder1, placeholder2) => {
			
			return ce('form', { id: id, name: id },
						ce('h2', null, title,
							ce('div', { className: 'btns-wrapper' },
								ce('a', { className: 'btn-primary', id: addBtnId }, 'Add Row'),
								ce('a', { className: 'btn-primary', id: btnId }, 'Next')
							)
						),
						ce('fieldset', null,
							_renderTextInput(placeholder1, placeholder2),
							_renderTextInput(placeholder1, placeholder2),
							_renderTextInput(placeholder1, placeholder2)
						)
						
					);
		},
		_renderBuddiesForm = () => {
			
			return _renderForm('formBuddies', 'Type in Buddies name', 'btnBuddies', 'btnNewBuddy', 'Buddy name');
		},
		_renderSpendingsForm = () => {
			
			return _renderForm('formSpendings', 'Type in Spendings', 'btnSpendings', 'btnNewSpending', 'Spending', 'Amount');
		},
		_renderSpendersForm = () => {
			
			return _renderForm('formSpenders', 'Type in Spenders name', 'btnSpenders', 'btnNewSpender', 'Spender', 'Amount');
		}
;
	
	class App extends React.Component {
		
		constructor(props) {
		
	    	super(props);
	    	
	    	this.state = {
	    		spendings: [],
	    		buddies: [],
	    		spenders: []
	    	}
			
		}
		
		render() {
			
			return (
				// Main Wrapper
				ce('div', { id: 'appWrapper' },
					_renderHeader(),
					_renderWizardNav(),
					ce('div', {id: 'contentSection'},
						_renderBuddiesForm(),
						_renderSpendingsForm(),
						_renderSpendersForm()
					)
				)
			);
		}
	}
	
	console.log(new App());
	
	RD.render(ce(App), document.getElementById('root'));
	
})(React, ReactDOM));
