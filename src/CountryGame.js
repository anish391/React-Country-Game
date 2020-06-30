import React, {Component} from 'react';
import FlagQuestion, {QuestionStates} from './FlagQuestion.js';
import shuffle from 'shuffle-array';

class CountryGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			options: [],
			correctOption: undefined,
			questionState: undefined
		};
		
		this.onGuess = this.onGuess.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
	}
	
	componentDidMount() {
		fetch("https://restcountries.eu/rest/v2/all")
		.then(response=>response.json())
		.then(countries => {
			const correctOption = Math.floor(Math.random()*countries.length);
			const options = this._getOptions(correctOption, countries);
			this.setState({
				countries,
				options,
				correctOption,
				questionState: QuestionStates.QUESTION
			});
		})
		.catch(console.warn);
	}
	
	
	
	_getOptions(correctOption, countries) {
		// Array of country IDs already containing correctOption.
		let options = [correctOption];
		let tries = 0;
		// Get three option IDs from countries array other than the correct option.
		while(options.length<4 && tries<15){
			let option = Math.floor(Math.random() * countries.length);
			if(options.indexOf(option)===-1)
				options.push(option);
			else
				tries++;
		}
		return shuffle(options);
	}
	
	onGuess(answer) {
		const {correctOption} = this.state;
		let questionState = answer === correctOption ? QuestionStates.ANSWER_CORRECT : QuestionStates.ANSWER_WRONG;
		this.setState({questionState});
	}
	
	nextQuestion() {
		const {countries} = this.state;
		const correctOption = Math.floor(Math.random() * countries.length);
		const options = this._getOptions(correctOption, countries);
		this.setState({
		  correctOption,
		  options,
		  questionState: QuestionStates.QUESTION
		}); 
	}
	
	render() {
		let {
			countries,
			options,
			correctOption,
			questionState,
		} = this.state;
		let output = <div>Loading...</div>;
		if(correctOption!==undefined) {
			const {flag, name} = countries[correctOption];
			let opts = options.map(countryID => {
				return {
					id: countryID,
					name: countries[countryID].name
				}
			});
			output = (
				<FlagQuestion
					answerText={name}
					onGuess={this.onGuess}
					onNext={this.nextQuestion}
					options={opts}
					questionState={questionState}
					flag={flag}
				/>
			);
		}
		return (
			<div style={{marginTop: '15px'}}>
				{output}
			</div>
		);
	}
	
}

export default CountryGame;