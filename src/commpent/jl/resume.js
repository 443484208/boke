import React, {
	Component
} from 'react';

import './../../App.css';
import { Message } from 'element-react';
import { Link } from 'react-router-dom';

import { PDFReader } from 'react-read-pdf';

const pdfurl = require('./../../image/李睿鸿.pdf') 

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {
		
		

	}
	
	render() {
	


		
		return(
			<div className="resume"><PDFReader url={pdfurl} page={1} /><PDFReader url={pdfurl} page={2}/></div>
		);
	}
}

export default App;