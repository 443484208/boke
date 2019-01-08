import React, {
	Component
} from 'react';
import { Link } from 'react-router-dom';
import Exhibition from './exhibition';
import ajax from './../../js/ajax';
import time from './../../js/time';
import ReactQuill, {
	Quill
} from 'react-quill'; // ES6
import { ImageDrop } from 'quill-image-drop-module';
import 'react-quill/dist/quill.snow.css'; // ES6
import 'react-quill/dist/quill.bubble.css'; // ES6
import 'react-quill/dist/quill.core.css'; // ES6
import './../../css/menu.css';
import { Message, Button } from 'element-react';
import 'element-theme-default';
Quill.register('modules/imageDrop', ImageDrop);

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			title: '',
			loading: false,
			modules: {
				toolbar: [
					['bold', 'italic', 'underline', 'strike'], // toggled buttons
					['blockquote', 'code-block'],

					[{
						'header': 1
					}, {
						'header': 2
					}], // custom button values
					[{
						'list': 'ordered'
					}, {
						'list': 'bullet'
					}],
					[{
						'script': 'sub'
					}, {
						'script': 'super'
					}], // superscript/subscript
					[{
						'indent': '-1'
					}, {
						'indent': '+1'
					}], // outdent/indent
					[{
						'direction': 'rtl'
					}], // text direction

					[{
						'size': ['small', false, 'large', 'huge']
					}], // custom dropdown
					[{
						'header': [1, 2, 3, 4, 5, 6, false]
					}],

					[{
						'color': []
					}, {
						'background': []
					}], // dropdown with defaults from theme
					[{
						'font': []
					}],
					[{
						'align': []
					}],

					['link', 'image'],
					['clean'],

				],
				imageDrop: true,
			},
		}

	}

	handleChange = (value) => {
		this.setState({
			text: value
		})
		this.refs.Exhibition.handleChange(value);
	}
	titleChange = (e) => {

		this.setState({
			title: e.target.value
		})
		this.refs.Exhibition.titleChange(e.target.value);

	}
	submission = () => {

		var articleData = {
			user: localStorage.getItem('user'),
			session: localStorage.getItem('session'),
			title: this.state.title,
			text: this.state.text,
			modificationtime: time.getDays(new Date()),
		}
		if((articleData.title.indexOf(" ") >= 0 || articleData.title == null || articleData.title == '') || ( articleData.text == null || articleData.text == '')) {
			Message({
				message: '标题和内容不能为空！',
				type: 'warning'
			});
			return;
		} else {
		this.state.loading = true;
		this.setState(
			this.state
		)
			var vm = this;
		
		ajax.postJson('http://localhost:3000/wz/article', articleData).then(data => {
				if(data.code == '200') {
					Message({
				message: '提交成功！三秒返回首页',
			});

			
			setTimeout(() => {
				vm.props.history.push('/')
			}, 3000)
				}

			}, err => {
		vm.state.loading = true;
		vm.setState(
			vm.state
		)

				console.log(err)
			})
			

		}
	}
	clean = () => {
		this.state.text = '';
		this.state.title = '';
		this.setState(
			this.state
		)
		this.refs.Exhibition.titleChange('');
		this.refs.Exhibition.handleChange('');

		Message({
			message: '清除成功！',
		});

	}
	back=()=>{
		this.props.history.goBack()
	}

	render() {
		return(
			<div>
			<div className="article-h1">
			<input placeholder="输入文章标题..."  onChange={this.titleChange} value={this.state.title} maxLength="80" />
			<ReactQuill value={this.state.text}
                  onChange={this.handleChange} modules={this.state.modules}
                    />
</div>
						<div className="article-h2"><Exhibition ref='Exhibition' />
						</div>
						<div className="article-h3">
						<Button type="primary" onClick={this.submission} icon="edit" loading={this.state.loading}>提交</Button>
						<Button type="danger" onClick={this.clean} icon="delete" >清除</Button>
						<Button type="success" onClick={this.back} icon="caret-left" >返回</Button>
						</div>
</div>
		)
	}
}

export default App;