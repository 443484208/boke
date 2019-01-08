import React, {
	Component
} from 'react';

import { Message, Input, Button } from 'element-react';
import 'element-theme-default';
import './../css/menu.css';
import ajax from './../js/ajax';
import time from './../js/time';
import ExhibitionText from './article/exhibitionText';
import { Link } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailsData: {

			},
			wzarticlereviewData: '',
			detailsButtons: '',
			textbox: '',

		};

	}
	componentDidMount() {
		this.getDetails();
		var a = '2';
		console.log(a.__proto__)

	}
	getDetails = () => {
		var getData = {
			user: localStorage.getItem('user'),
			session: localStorage.getItem('session'),
			id: time.getParam('id'),
		}
		ajax.postJson('http://localhost:3000/wz/details', getData).then(data => {
			if(data.code == '200') {
				data.data.modificationtime = time.getTime(data.data.modificationtime)
				this.state.detailsData = data.data;

				this.setState(this.state);
				this.refs.ExhibitionText.handleChange(data.data.text);
				this.refs.ExhibitionText.titleChange(data.data.title);
				this.wzarticlereview();
			}

		}, err => {
			console.log(err)
		})
	}
	wzarticlereview = () => {
		var getData = {
			user: localStorage.getItem('user'),
			session: localStorage.getItem('session'),
			id: time.getParam('id'),
		}
		ajax.postJson('http://localhost:3000/wz/articlereview', getData).then(data => {
			if(data.code == '200') {
				this.state.detailsId = data.data.id;
				this.state.wzarticlereviewData = data.data;
				this.setState (
					this.state
				)
			}

		}, err => {
			console.log(err)
		})
	}
	detailsFocus = () => {

		this.state.detailsButtons = (<div className="details-button">
  <Button  type="primary" onClick={this.writeComments}>评论</Button>
  </div>)

		this.setState(this.state)
	}
	writeComments = () => {
		var comments =this.state.wzarticlereviewData.comments==""? new Array():time.postObj(this.state.wzarticlereviewData.comments);
		var lists = {
			commentators: localStorage.getItem('user'),
			contents: this.state.textbox,
			CommentTimes: time.getTimes(new Date()),
		};
		comments.push(lists);
		var getData = {
			session: localStorage.getItem('session'),
			user: localStorage.getItem('user'),
			id: this.state.detailsId,
			list: time.postStr(comments)
		};
		console.log(getData)
		ajax.postJson('http://localhost:3000/wz/writeComments', getData).then(data => {
			if(data.code == '200') {
				
			}

		}, err => {
			console.log(err)
		})
		
	}
	detailsOnblur = (e) => {
		if(e.target.value == '') {
			this.state.detailsButtons = '';
			this.setState(this.state)
		}
	}
	detailsOnchange = (event) => {
		console.log(event)
		this.setState({
			textbox: event
		});

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
				<div className="footer">
<div  className="footer-title">评论</div>




  <Input onFocus={this.detailsFocus}  
        type="textarea" onBlur={this.detailsOnblur}
        onChange={this.detailsOnchange}
        autosize={{ minRows: 2, maxRows: 4}}
        placeholder="请输入内容" value={this.state.textbox}
      />
  {this.state.detailsButtons}


				</div>
				<div>

				<div className="details-item">
			<div className="details-comment ">
				<div className="details-popover">
						<div className="details-popover-lazy" ></div>
				</div>
				<div className="details-content">
					<div className="details-content-box">
						<div  className="details-inline">
						
							<a href="#" >ssssyoki
							
							</a>
						</div>
						
					</div>
					<div className="details-content-title">翻译这种垃圾文章不觉得浪费生命吗？还是你英语水平太差了实在找不到好的翻译了？</div>
					<div className="limit-ctl-box">
					
					</div>
					<div className="details-stat"><time datetime="2019-01-05T04:21:04.044Z" title="" className="time">16分钟前</time>
						
						<div className="details-stat-box">
							<div className="details-like-action details-action">
								<svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" className="icon like-icon">
									<g fill="none" fill-rule="evenodd">
										<path d="M0 0h20v20H0z"></path>
										<path stroke="#8A93A0" stroke-linejoin="round" d="M4.58 8.25V17h-1.4C2.53 17 2 16.382 2 15.624V9.735c0-.79.552-1.485 1.18-1.485h1.4zM11.322 2c1.011.019 1.614.833 1.823 1.235.382.735.392 1.946.13 2.724-.236.704-.785 1.629-.785 1.629h4.11c.434 0 .838.206 1.107.563.273.365.363.84.24 1.272l-1.86 6.513A1.425 1.425 0 0 1 14.724 17H6.645V7.898C8.502 7.51 9.643 4.59 9.852 3.249A1.47 1.47 0 0 1 11.322 2z"></path>
									</g>
								</svg><span className="action-title">1</span>

							</div>
							<div className="details-comment-action details-action">
								<svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" className="icon comment-icon">
									<g fill="none" fill-rule="evenodd">
										<path d="M0 0h20v20H0z"></path>
										<path stroke="#8A93A0" stroke-linejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path>
									</g>
								</svg> <span className="action-title">回复</span></div>
						</div>
					</div>

					<div className="sub-comment-list sub-comment-list">

					</div>
				</div>

			</div>
		</div>
				
				
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