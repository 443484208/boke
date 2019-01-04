import React, {
	Component
} from 'react';
import ajax from './../js/ajax';
import time from './../js/time';
import logo from './../logo.svg';

import { Message } from 'element-react';
import 'element-theme-default';

import { Link } from 'react-router-dom';
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			usernamezc: '',
			passwordzc: '',

		};

	}
	componentDidMount() {
		//    var lastGist = result[0];
		//    this.setState({
		//      username: lastGist.owner.login,
		//      lastGistUrl: lastGist.html_url
		//    });
	}
	gg() {

	}
	username = (event) => {
		this.setState({
			username: event.target.value

		});
	}
	password = (event) => {
		this.setState({
			password: event.target.value

		});
	}
	usernamezc = (event) => {
		this.setState({
			usernamezc: event.target.value
		});
	}
	passwordzc = (event) => {
		this.setState({
			passwordzc: event.target.value
		});
	}
	loginZc = () => {
		var dl = document.querySelector('.login-dl').style.display;
		var zc = document.querySelector('.login-zc').style.display;
		if(dl == 'none') {

			document.querySelector('.login-dl').style.display = 'block';
			document.querySelector('.login-zc').style.display = 'none';
			this.setState({
				usernamezc: '',
				passwordzc: '',
			})
		} else {
			this.setState({
				username: '',
				password: '',
			})
			document.querySelector('.login-dl').style.display = 'none';
			document.querySelector('.login-zc').style.display = 'block';
		}

	}
	register = () => {

		var logindata = {
			user: this.state.usernamezc,
			password: this.state.passwordzc,
			lastTime: time.getDays(new Date()),
		}
		this.setState({
			username: this.state.usernamezc,

		})
		if((logindata.user.indexOf(" ") >= 0 || logindata.user == null || logindata.user == '') || (logindata.password.indexOf(" ") >= 0 || logindata.password == null || logindata.password == '')) {
			Message({
				message: '不能为空！',
				type: 'warning'
			});
			return;
		} else {
			//			
			ajax.postJson('http://134.175.9.97:3000/addUser', logindata).then(data => {
				if(data.code == '200') {
					Message({
						message: '注册成功！',
					});

					this.loginZc();
				}

			}, err => {
				console.log(err)
			})
		}

	}
	login = () => {
		var logindata = {
			user: this.state.username,
			password: this.state.password,
		}

		if((logindata.user.indexOf(" ") >= 0 || logindata.user == null || logindata.user == '') || (logindata.password.indexOf(" ") >= 0 || logindata.password == null || logindata.password == '')) {
			Message({
				message: '不能为空！',
				type: 'warning'
			});
			return;
		} else {
			//			
			ajax.postJson('http://134.175.9.97:3000/login', logindata).then(data => {
				if(data.code == '200') {
					Message({
						message: '登陆成功！',
					});
					localStorage.setItem('user', data.data.user);
					localStorage.setItem('session', data.data.session);
					this.props.fmenuLogin('true');
					this.props.father(data);
				}

			}, err => {
				console.log(err)
			})
		}

	}
	close = () => {
		this.props.fmenuLogin('false');

	}

	render() {
		return(
			<div className="login ">
			    <div className="login-box login-dl">
			    <i  title="关闭" onClick={this.close} className="close-btn ion-close-round"></i>
			    <h1  className="title">登录</h1>
			    <div className="login-box-input"><input   maxLength="64" placeholder="请输入账号" onChange={this.username} value={this.state.username} /></div>
			    <div className="login-box-input"><input   maxLength="64" type="password" onChange={this.password}  placeholder="请输入密码" value={this.state.password}  /></div>
			    <button onClick={this.login} >登录</button>
			    <div className="login-prompt-box">没有账号？ <span  className="login-box-clickable" onClick={this.loginZc}>注册</span></div>
			    </div>
			    <div className="login-box  login-zc">
			    <i  title="关闭" onClick={this.close} className="close-btn ion-close-round"></i>
			    
			    <h1  className="title">注册</h1>
			    <div className="login-box-input"><input   maxLength="64" placeholder="请输入注册账号" onChange={this.usernamezc} value={this.state.usernamezc} /></div>
			    <div className="login-box-input"><input   maxLength="64" type="password" onChange={this.passwordzc}  placeholder="请输入注册密码" value={this.state.passwordzc}  /></div>
			    <button onClick={this.register} >注册</button>
			    <div className="login-prompt-box"> <span  className="login-box-clickable" onClick={this.loginZc}>已有账号登陆</span></div>
			    </div>
			</div>

		);
	}
}

export default App;