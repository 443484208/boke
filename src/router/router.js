/*
   Root, Router 配置
*/
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
 
import App from './../App';
import login from './../commpent/login';
 
import test from './../commpent/first_app';
import home from './../commpent/home';
import article from './../commpent/article/article';
import articlereview from './../commpent/list/list';

 
const Root = () => (
   <div>
      <Switch>
         <Route
            path="/"
            render={props => (
               <App>
                  <Switch>
                     <Route path="/" exact component={home} />
                     <Route path="/six" component={article} />
                     <Route path="/articlereview" component={articlereview} />

                      {/*路由不正确时，默认跳回home页面*/}
                     <Route render={() => <Redirect to="/" />} />
                  </Switch>
               </App>
            )}
         />
      </Switch>
   </div>
);
 
export default Root;

//      <Link to={{ pathname: '/test', search:'?name=homename', state: { mold: 'add' ,aa:'dddd' }}} className="home-link">
//                点击跳转到路由参数search，state使用
//      </Link>