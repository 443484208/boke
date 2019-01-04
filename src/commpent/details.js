import React, {
	Component
} from 'react';

import './../css/menu.css';
import ajax from './../js/ajax';
import time from './../js/time';
import ExhibitionText from './article/exhibitionText';
import { Link } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailsData:{
				
			}
		};

	}
	componentDidMount() {
		this.getDetails();
		
	}
	getDetails = () => {
		var getData = {
			user: localStorage.getItem('user'),
			session: localStorage.getItem('session'),
			id: localStorage.getItem('detailsId'),
		}
		ajax.postJson('http://134.175.9.97:3000/wz/details', getData).then(data => {
			if(data.code == '200') {
				data.data.modificationtime=time.getDays(data.data.modificationtime)
				this.state.detailsData=data.data;
				this.setState(this.state);
				this.refs.ExhibitionText.handleChange(data.data.text);
		this.refs.ExhibitionText.titleChange(data.data.title);
			}

		}, err => {
			console.log(err)
		})
	}

	render() {
		return(<div className="details">
			<div className="details-area details-article-area shadow">
				<div className="details-area-author"><div  className="details-headPortrait"></div>
					<div className="author-info-box">
						<a href="#" className="username ellipsis">{this.state.detailsData.user}</a>
						<div><time  title={this.state.detailsData.modificationtime}>{this.state.detailsData.modificationtime}</time><span>阅读 {this.state.detailsData.look}</span>

						</div>
					</div>
				</div>
				<h1 className="details-area-title">{this.state.detailsData.title}</h1>
				<div><ExhibitionText ref='ExhibitionText' />
				</div>
			</div>

			<div className="details-sidebar">

					<div  className="details-sidebar-author">关于作者</div>
					<div className="details-sidebar-div">
						<a  href="#" className="details-sidebar-item" >
							<div    className="details-sidebar-avatar" ></div>
							<div  className="details-sidebar-box">
								<div  className="details-sidebar-username">{this.state.detailsData.user}</div>
								<div  title="前端开发" className="details-sidebar-position">前端开发</div>
							</div>
						</a>
					</div>
					<div  className="details-sidebar-author">个人介绍</div>
					<div  className="details-sidebar-introduce">
						暂无功能
					</div>

			</div>
		</div>);
	}
}

export default App;