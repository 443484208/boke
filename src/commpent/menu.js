import React, {
	Component
} from 'react';

import './../css/menu.css';
import { Message,Dropdown,MessageBox} from 'element-react';
import time from './../js/time';


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
				title: '作者',
				href: 'about'
			}],
			loginStatus: false,
			titleStatus: 'home',
			start:false,

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
		if( this.state.list[e].href=='article'){
			this.state.menuStart = this.state.list[e].title;
		this.props.fmenu(this.state.list[e].href);
		this.setState(this.state);

		}else{
			this.state.menuStart = this.state.list[e].title;
		this.props.fmenu(this.state.list[e].href);
		this.setState(this.state);

		}
		

	}
	menuLogin = (data) => {
		this.props.fmenuLogin();
	}
	menuRegister = () => {
		this.props.fmenuRegister();

	}
	cancellation=(e)=> {
		MessageBox.confirm('此操作将退出, 是否继续?', '提示', {
		  type: 'warning'
		}).then(() => {
			time.clearLocalStorageAll();

		  Message({
			type: 'success',
			message: '注销成功!三秒后重新登陆'
		  });
		  setTimeout(() => {
			window.location.reload()
		}, 3000)
		}).catch(() => {
		  Message({
			type: 'info',
			message: '已取消注销'
		  });
		});
	  }
	
	withLoadingIndicator = (data) => {
		if(this.state.loginStatus) {
			var user = localStorage.getItem('user')
			return(<li className="nav-item auth">
					<div className="nav-item submit"><img src="https://b-gold-cdn.xitu.io/v3/static/img/submit-icon.53f4253.svg" className="icon"/> 
					 <Link className="menu-article-pc" target="_blank"  to="/six"><span>  写文章</span></Link>
					 <Link className="menu-article-yd"  to="/six"><span>  写文章</span></Link>
			
					</div>
					<Dropdown onCommand={this.cancellation.bind(this)} menu={(
          <Dropdown.Menu>
            <Dropdown.Item command="a">注销</Dropdown.Item>
            <Dropdown.Item className="menu-article-pc"  command="b">修改密码</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <span className="el-dropdown-link">
		  {user}<i className="el-icon-caret-bottom el-icon--right"></i>
          </span>
        </Dropdown>
					</li>)
		} else {

			return(<li className="nav-item auth">
		
							<span onClick={this.menuLogin} className="menu-login">登录</span>
					</li>)
		}
	}
handleCommand=(command)=> {
	
	this.setState({
		menuStart:this.state.list[command].title
	})
	this.props.fmenu(this.state.list[command].href);



	

}
back=()=>{
		this.props.fmenus();
	
}
	render() {

		var lis = this.state.list;
		var list = [];
		for(var i = 0; i < lis.length; i++) {
			list.push(<li key={lis[i].title} onClick={this.menuClick.bind(this, i)}  className={['nav-item link-item route-active',lis[i].href==this.state.titleStatus?'menu-red':null].join(' ')} > 
								{lis[i].title}
							</li>)
		};

		var ll = this.withLoadingIndicator();
		return(
			<div className="menu-container">
			<nav role="navigation" className="menu-nav">
				<ul className="menu-list">
					<li className="main-nav-list">
						<div className="phone-show-menu" >
						{this.state.start==true?<span onClick={this.back} className=" menu-red" >{this.state.menuStart}</span>: <Dropdown   trigger="click"  onCommand={this.handleCommand.bind(this)}  menu={(
        <Dropdown.Menu>
          <Dropdown.Item command="0">首页</Dropdown.Item>
          <Dropdown.Item command="1">自己</Dropdown.Item>
          <Dropdown.Item command="3">留言</Dropdown.Item>
          <Dropdown.Item command="4">作者</Dropdown.Item>

        </Dropdown.Menu>
      )}><span className=" menu-red" >{this.state.menuStart}</span>
        </Dropdown>}
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