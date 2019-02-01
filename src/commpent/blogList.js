import React, {
	Component
} from 'react';

import './../css/menu.css';
import ajax from './../js/ajax';
import time from './../js/time';
import hyApi from './../js/api';
import { Message, Loading } from 'element-react';
import { Link } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: 5,
			pageIndex: 1,
			pageSize: 10,
			user: localStorage.getItem('user'),
			session: localStorage.getItem('session'),
			innerList: [],
			option: '0',
			Loading: false,
		};

	}
	componentDidMount = () => {
		this.blogListApi();
	}


	blogListApi = (data="") => {
		if(data=='1'){
			this.state.innerList=[];
		}
		this.state.Loading = true;
		this.setState(
			this.state
		)
		var that = this;
		var form = 'option=' + this.state.option + '&session=' + localStorage.getItem('session') + "&pageIndex=" + this.state.pageIndex + '&pageSize=' + this.state.pageSize + '&user=' + localStorage.getItem('user');
		ajax.getJson(hyApi + 'wz/search?' + form).then(data => {
			if(data.code == 200) {
				var a = [];
				for(var i = 0; i < data.innerList.length; i++) {
					var day = time.hyCurrent(data.innerList[i].modificationtime);

					var days = time.getTime(data.innerList[i].modificationtime);
					a.push(<li key={data.innerList[i].id}><Link   to={'articlereview?id='+data.innerList[i].id} >
				<div className="blogList-box" >
					<div className="blogList-info">
						<div className="blogList-meta">
							<ul className="blogList-meta-list">
								<li className="item username clickable">
									{data.innerList[i].user}
								</li>
								<li className="item">{day}</li>
								
							</ul>
						</div> 
						<div className="blogList-title">
							{data.innerList[i].title}
						</div>
						<div className="blogList-meta">
							<i><svg viewBox="64 64 896 896"  width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg></i>{data.innerList[i].look}
							<i><svg viewBox="64 64 896 896"  width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M464 512a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm200 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm-400 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 0 0-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 0 0-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 0 0 112 714v152a46 46 0 0 0 46 46h152.1A449.4 449.4 0 0 0 510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 0 0 142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path></svg></i>{data.innerList[i].comment}
							<span >{days}</span></div>
					</div>
				</div>
				</Link></li>)
				}

				this.state.innerList = this.state.innerList.concat(a);
				this.setState(
					this.state
				)
				setTimeout(() => {
					this.setState({
						Loading: false
					});
					this.props.dropDowns();
				}, 1000);
			}else{
				setTimeout(() => {
						Message({
			message: data.message,
			type: 'warning'
		});
					this.setState({
						Loading: false
					});
					this.props.dropDowns();
				}, 1000);
			


			}

		}, err => {
			console.log(err)
		})

	}

	componentDidMount() {}
	render() {

		var li = this.state.innerList
		console.log(li)
		return(

			<ul className="blogList" >
			{li}
			 {
        this.state.Loading && <Loading fullscreen={this.state.Loading} />
      }

		</ul>
		);
	}
}

export default App;