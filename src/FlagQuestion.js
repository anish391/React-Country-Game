import React, {Component} from 'react';
import FlagChoices from './FlagChoices';
import FlagAnswer from './FlagAnswer';
import './FlagQuestions.css';

const QuestionStates = {
	QUESTION: 1,
	ANSWER_WRONG: 2,
	ANSWER_CORRECT:3
};

class FlagQuestion extends Component {
	static defaultProps = {
		options: []
	}

	constructor(props){
		super(props);
		this.state = {
			userChoice: undefined,
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({userChoice: Number(e.target.value)});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onGuess(this.state.userChoice);
	}

	render() {
		const {
			flag,
			questionState,
			options,
			answerText,
			onNext
		} = this.props;
		
	}
}

export default FlagQuestion;
export {QuestionStates};