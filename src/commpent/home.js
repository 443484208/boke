import React, {
	Component
} from 'react';
import logo from './../logo.svg';
import './../App.css';

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
			detailsList:false,
		}
	}
	componentDidMount() {
		if(localStorage.getItem('user')){
			this.state.isLogin=true;
		}else{
			this.state.isLogin=false;
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

	}
	renderButton=()=> {
		if(this.state.isLogin == false) {
			return <Login fmenuLogin={this.fmenuLogin} father={this.father} ref="getLogin"  />
		} else {
		}
	}
	fmenuLogin=(data)=>{
		this.state.isLogin=data||false;
		this.setState(
			this.state
		)
		
		this.renderButton();
		this.refs.getMenu.componentDidMount();
		this.refs.blogList.blogListApi();
	}
	fmenuRegister=()=>{
		this.state.isLogin=false;
		this.setState(
			this.state
		)
		this.renderButton();

		this.refs.getLogin.loginZc();
	}
	renderLists=(id)=>{
		
		if(this.state.detailsList) {

			return <Details />
		} else {
			return <BlogList ref="blogList" renderList={this.renderList}/>
			
		}
	}
	renderList=(data,id)=>{
		this.state.detailsList=data||false;
		this.setState(
			this.state
		);
			localStorage.setItem('detailsId',id)
		
		this.renderLists(id);
	}
	
	render() {
		var a=this.renderButton();
		var b=this.renderLists();

		
		return(
			<div>
			{a}
			<Menu renderList={this.renderList} fmenuLogin={this.fmenuLogin} fmenuRegister={this.fmenuRegister} fmenu={this.fmenu} ref="getMenu"/>
			{b}
           </div>
		);
	}
}

export default App;