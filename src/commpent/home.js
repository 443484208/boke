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
import Resume from './jl/resume'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: [],
			menu: '',
			isLogin: false,
			detailsList: false,
			dropDown:false,
			blogList:false,
			menuData:'home',
		}
	}
	componentDidMount() {
window.addEventListener('scroll', this.dropDown)
		console.log(this.props.location.query)
		if(localStorage.getItem('user')) {
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

		this.state.menu = data;
		this.setState(
			this.state
		)
		var datas = {
			pathname: '/',
			query: data,
		}
		this.props.history.push(datas)
		if(data == 'article') {
			this.setState({
				blogList:false,
				menuData:data,
			})
			setTimeout(()=>{
				this.refs.blogList.state.pageIndex=1;
			this.refs.blogList.state.pageSize=10;
			this.refs.blogList.state.option = '1';
			this.refs.blogList.setState(
			this.refs.getMenu.state
		);
		this.refs.blogList.blogListApi('1')
		
			},100)

		
		} else  if(data=='home'){
			this.setState({
				blogList:false,
				menuData:data,
			})
			setTimeout(()=>{
				this.refs.blogList.state.option = '0';
		this.refs.blogList.state.pageIndex=1;
		this.refs.blogList.state.pageSize=10;
		this.refs.blogList.setState(
			this.refs.blogList.state
		)
		this.refs.blogList.blogListApi('1')
				},100)
			
		}else if(data=='about'){
			this.setState({
				blogList:true,
				menuData:data,
			})
		}
		
		this.refs.getMenu.state.titleStatus = data;
		this.refs.getMenu.setState(
			this.refs.getMenu.state
		);

	}
	renderButton = () => {
		if(this.state.isLogin == false) {
			return <Login fmenuLogin={this.fmenuLogin} father={this.father} ref="getLogin" />
		} else {}
	}
	fmenuLogin = (data) => {
		this.state.isLogin = data || false;
		this.setState(
			this.state
		)
		this.renderButton();
			this.refs.getMenu.componentDidMount();
		
if(data=='true'){
	console.log("666")

		this.refs.blogList.blogListApi();
	


}


	}
	fmenuRegister = () => {
		this.state.isLogin = false;
		this.setState(
			this.state
		)
		this.renderButton();

		this.refs.getLogin.loginZc();
	}
dropDown = (event) => {

	// 滚动的高度
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        // 视窗高度
        const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
        // 页面高度
        const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
        // 距离页面底部的高度
        const height = scrollHeight - scrollTop - clientHeight;
       if(height==0&&this.state.dropDown==false&&(this.state.menuData=='home'||this.state.menuData=='article')){
       	this.state.dropDown = true;
		this.setState(
			this.state
		)
		this.refs.blogList.state.pageIndex=this.refs.blogList.state.pageIndex+1;
		this.refs.blogList.state.pageSize=this.refs.blogList.state.pageSize+10;
		this.refs.blogList.setState(
			this.refs.blogList.state
		)
		this.refs.blogList.blogListApi()
		
       }
    }
dropDowns=()=>{
	this.state.dropDown = false;
}
	render() {
		var a = this.renderButton();
		
		return(
			<div className="home-content"  ref="list" onScroll={this.dropDown}>
				{a}
				<Menu renderList={this.renderList} fmenuLogin={this.fmenuLogin} fmenuRegister={this.fmenuRegister} fmenu={this.fmenu} ref="getMenu" />
				 {
       this.state.isLogin==true?( this.state.blogList==false? <BlogList ref="blogList"  dropDowns={this.dropDowns} />:<Resume/>):''
      }
				
			</div>
		);
	}
}

export default App;