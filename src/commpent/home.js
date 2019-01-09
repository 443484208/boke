import React, {
	Component
} from 'react';
import logo from './../logo.svg';
import './../App.css';
import { Message } from 'element-react';
import { Link } from 'react-router-dom';
import Login from './login'
import Menu from './menu'
import Details from './details'
import BlogList from './blogList'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: [],
			menu: '',
			isLogin: false,
			detailsList: false,
		}
	}
	componentDidMount() {
		console.log(this.props.location.query)
		if (localStorage.getItem('user')) {
			this.state.isLogin = true;
		} else {
			this.state.isLogin = false;
		}
		this.setState(this.state);

	}
	//	接受登陆参数
	father = (data) => {
		this.state.isLoggedIn = 'home';
		this.renderButton();
		this.setState(
			this.state
		)

	}
	//	接受登陆
	fmenu = (data) => {
		console.log("6")

		this.state.menu = data;
		this.setState(
			this.state
		)
		var datas = {

			pathname: '/',
			query: data,

		}

		this.props.history.push(datas)

	}
	renderButton = () => {
		if (this.state.isLogin == false) {
			return <Login fmenuLogin={this.fmenuLogin} father={this.father} ref="getLogin" />
		} else {
		}
	}
	fmenuLogin = (data) => {
		this.state.isLogin = data || false;
		this.setState(
			this.state
		)

		this.renderButton();
		this.refs.getMenu.componentDidMount();
		this.refs.blogList.blogListApi();
	}
	fmenuRegister = () => {
		this.state.isLogin = false;
		this.setState(
			this.state
		)
		this.renderButton();

		this.refs.getLogin.loginZc();
	}

	render() {
		var a = this.renderButton();



		return (
			<div>
				{a}
				<Menu renderList={this.renderList} fmenuLogin={this.fmenuLogin} fmenuRegister={this.fmenuRegister} fmenu={this.fmenu} ref="getMenu" />
				<BlogList ref="blogList" />
			</div>
		);
	}
}

export default App;