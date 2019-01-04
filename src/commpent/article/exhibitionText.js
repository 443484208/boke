import React, {
	Component
} from 'react';

import ReactQuill from 'react-quill'; // ES6


import 'react-quill/dist/quill.bubble.css'; // ES6
import 'react-quill/dist/quill.core.css'; // ES6

import './../../css/menu.css';

import { Link } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			title:'',
		} // You can also pass a Quill Delta here

	}

	handleChange = (value) => {
		this.setState({
			text: value
		})
	}
	titleChange = (value) => {
		this.setState({
			title: value
		})
	}

	render() {
		
		return(

<div className="exhibition">

		<ReactQuill  value={this.state.text}  />
</div>
		)
	}
}

export default App;