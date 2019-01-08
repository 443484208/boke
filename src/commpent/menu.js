import React, {
	Component
} from 'react';

import './../css/menu.css';

import { Link } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuStart: '首页',
			list: [{
				title: '首页',
				href: 'home'
			}, {
				title: '自己',
				href: 'article'
			}, {
				title: '历程',
				href: 'course'
			}, {
				title: '留言',
				href: 'leavingMessage'
			}, {
				title: '关于',
				href: 'about'
			}],
			loginStatus: false,

		};

	}
	componentDidMount() {
		if(localStorage.getItem('user')) {
			this.state.loginStatus = true;
		} else {
			this.state.loginStatus = false;
		}
		this.setState(this.state);

	}
	menuClick = (e) => {
		this.state.menuStart = this.state.list[e].title;
		this.props.fmenu(this.state.list[e].href);
		this.setState(this.state);


	}
	menuLogin = (data) => {
		this.props.fmenuLogin();
	}
	menuRegister = () => {
		this.props.fmenuRegister();

	}
	
	withLoadingIndicator = (data) => {
		if(this.state.loginStatus) {
			var user = localStorage.getItem('user')
			return(<li className="nav-item auth">
					<div className="nav-item submit"><img src="https://b-gold-cdn.xitu.io/v3/static/img/submit-icon.53f4253.svg" className="icon"/>  <Link to="/six"><span>  写文章</span></Link>
			
					</div>
							<span>{user}</span>
					</li>)
		} else {

			return(<li className="nav-item auth">
		
							<span onClick={this.menuLogin} className="menu-login">登录</span>
					</li>)
		}
	}

	render() {

		var lis = this.state.list;
		var list = [];
		for(var i = 0; i < lis.length; i++) {
			list.push(<li key={lis[i].title} onClick={this.menuClick.bind(this, i)}  className="nav-item link-item route-active">
								{lis[i].title}
							</li>)
		};

		var ll = this.withLoadingIndicator();
		return(
			<div className="menu-container">
			<nav role="navigation" className="menu-nav">
				<ul className="menu-list">
					<li className="main-nav-list">
						<div className="phone-show-menu"><span>{this.state.menuStart}</span>
							<div className="icon ion-arrow-down-b"></div>
						</div>
						<ul className="phone-hide">
							{list}
						</ul>
					</li>
					
					{ll}
					
				</ul>
			</nav>
		</div>

		);
	}
}

export default App;