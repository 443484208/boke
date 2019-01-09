import React, {
	Component
} from 'react';
import ajax from './../js/ajax';
import time from './../js/time';
import logo from './../logo.svg';
import hyApi from './../js/api';

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
			email: '',
			retrieve: '',

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
	email = (event) => {
		this.setState({
			email: event.target.value
		});
	}
	passwordzc = (event) => {
		this.setState({
			passwordzc: event.target.value
		});
	}
	loginZc = () => {
		document.querySelector('.login-retrieve').style.display = 'none';
		document.querySelector('.login-retrieves').style.display = 'none';

		var dl = document.querySelector('.login-dl').style.display;
		var zc = document.querySelector('.login-zc').style.display;
		if (dl == 'none') {

			document.querySelector('.login-dl').style.display = 'block';
			document.querySelector('.login-zc').style.display = 'none';
			this.setState({
				usernamezc: '',
				email: '',
				passwordzc: '',
			})
		} else {
			this.setState({
				username: '',
				email: '',
				password: '',
			})
			document.querySelector('.login-dl').style.display = 'none';
			document.querySelector('.login-zc').style.display = 'block';
		}

	}
	retrieve = () => {
		document.querySelector('.login-dl').style.display = 'none';
		document.querySelector('.login-zc').style.display = 'none';
		document.querySelector('.login-retrieves').style.display = 'none';
		document.querySelector('.login-retrieve').style.display = 'block';
		this.setState({
			usernamezc: '',
			passwordzc: '',
			retrieve: '',
			email: '',
			username: '',
		})
	}
	register = () => {

		var logindata = {
			user: this.state.usernamezc,
			password: this.state.passwordzc,
			lastTime: time.getTimes(new Date()),
			email: this.state.email,
		}
		this.setState({
			username: this.state.usernamezc,

		})
		if ((logindata.user.indexOf(" ") >= 0 || logindata.user == null || logindata.user == '') || (logindata.password.indexOf(" ") >= 0 || logindata.password == null || logindata.password == '')) {
			Message({
				message: '不能为空！',
				type: 'warning'
			});
			return;
		} else {
			//			
			ajax.postJson(hyApi+'addUser', logindata).then(data => {
				if (data.code == '200') {
					Message({
						message: '注册成功！',
					});
					this.setState({
						usernamezc: '',
						passwordzc: '',
						email: '',
					})
					this.loginZc();
				} else {
					Message({
						message: data.message,
						type: 'warning'
					});
				}

			}, err => {
				console.log(err)
			})
		}

	}
	retrieves = () => {
		var logindata = {
			user: this.state.usernamezc,
			email: this.state.email,
		}

		if ((logindata.user.indexOf(" ") >= 0 || logindata.user == null || logindata.user == '') || (logindata.email.indexOf(" ") >= 0 || logindata.email == null || logindata.email == '')) {
			Message({
				message: '不能为空！',
				type: 'warning'
			});
			return;
		} else {
			//			
			ajax.postJson(hyApi+'search', logindata).then(data => {
				if (data.code == '200') {
					Message({
						message: '请重新设置密码！',
					});
					this.setState({
						retrieve: data.data.retrieve
					})
					document.querySelector('.login-retrieves').style.display = 'block';
					document.querySelector('.login-retrieve').style.display = 'none';

				} else {
					Message({
						message: data.message,
						type: 'warning'
					});
				}
			}, err => {
				console.log(err)
			})
		}
	}
	rebuild = () => {
		var logindata = {
			user: this.state.usernamezc,
			password: this.state.passwordzc,
			retrieve: this.state.retrieve,
		}

		if (logindata.password.indexOf(" ") >= 0 || logindata.password == null || logindata.password == '') {
			Message({
				message: '不能为空！',
				type: 'warning'
			});
			return;
		} else {
			//			
			ajax.postJson(hyApi+'retrieve', logindata).then(data => {
				if (data.code == '200') {
					Message({
						message: '重设密码成功！',
					});
					document.querySelector('.login-dl').style.display = 'block';
					document.querySelector('.login-retrieves').style.display = 'none';
					this.setState({
						usernamezc: '',
						passwordzc: '',
						retrieve: '',
						email: '',
						username: logindata.user,
					})
				} else {
					Message({
						message: data.message,
						type: 'warning'
					});
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

		if ((logindata.user.indexOf(" ") >= 0 || logindata.user == null || logindata.user == '') || (logindata.password.indexOf(" ") >= 0 || logindata.password == null || logindata.password == '')) {
			Message({
				message: '不能为空！',
				type: 'warning'
			});
			return;
		} else {
			//			
			ajax.postJson(hyApi+'login', logindata).then(data => {
				if (data.code == '200') {
					Message({
						message: '登陆成功！',
					});
					localStorage.setItem('user', data.data.user);
					localStorage.setItem('session', data.data.session);
					this.props.fmenuLogin('true');
					this.props.father(data);
				} else {
					Message({
						message: data.message,
						type: 'warning'
					});
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
		return (
			<div className="login ">
				<div className="login-box login-dl">
					<i title="关闭" onClick={this.close} className="close-btn ion-close-round"></i>
					<h1 className="title">登录</h1>
					<div className="login-box-input"><input maxLength="64" placeholder="请输入账号" onChange={this.username} value={this.state.username} /></div>
					<div className="login-box-input"><input maxLength="64" type="password" onChange={this.password} placeholder="请输入密码" value={this.state.password} /></div>
					<button onClick={this.login} >登录</button>
					<div className="login-prompt-box"> <span className="login-box-clickable" onClick={this.loginZc}>注册</span></div>
					<div className="login-prompt-box"> <span className="login-box-clickable" onClick={this.retrieve}>忘记密码？</span></div>
				</div>
				<div className="login-box  login-zc">
					<i title="关闭" onClick={this.close} className="close-btn ion-close-round"></i>

					<h1 className="title">注册</h1>
					<div className="login-box-input"><input maxLength="64" placeholder="请输入注册账号" onChange={this.usernamezc} value={this.state.usernamezc} /></div>
					<div className="login-box-input"><input maxLength="64" type="password" onChange={this.passwordzc} placeholder="请输入注册密码" value={this.state.passwordzc} /></div>
					<div className="login-box-input"><input maxLength="64" onChange={this.email} placeholder="请输入找回密码邮箱" value={this.state.email} /></div>
					<button onClick={this.register} >注册</button>
					<div className="login-prompt-box"> <span className="login-box-clickable" onClick={this.loginZc}>已有账号登陆</span></div>
				</div>

				<div className="login-box  login-retrieve">
					<i title="关闭" onClick={this.close} className="close-btn ion-close-round"></i>

					<h1 className="title">忘记密码</h1>
					<div className="login-box-input"><input maxLength="64" placeholder="请输入账号" onChange={this.usernamezc} value={this.state.usernamezc} /></div>
					<div className="login-box-input"><input maxLength="64" onChange={this.email} placeholder="请输入找回密码邮箱" value={this.state.email} /></div>
					<button onClick={this.retrieves} >找回</button>
					<div className="login-prompt-box"> <span className="login-box-clickable" onClick={this.loginZc}>已有账号登陆</span></div>
				</div>
				<div className="login-box  login-retrieves">
					<i title="关闭" onClick={this.close} className="close-btn ion-close-round"></i>

					<h1 className="title">找回密码</h1>
					<div className="login-box-input"><input maxLength="64" placeholder="请输入密码" onChange={this.passwordzc} value={this.state.passwordzc} /></div>
					<button onClick={this.rebuild} >重设密码</button>
					<div className="login-prompt-box"> <span className="login-box-clickable" onClick={this.loginZc}>已有账号登陆</span></div>
				</div>
			</div>

		);
	}
}

export default App;