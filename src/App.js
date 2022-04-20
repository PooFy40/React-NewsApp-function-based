import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state={
    progress:0
  }
  apikey="e2530660ba7848cd922cc4c4ebaf8493"
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    
    return (
      
      <div>
        
       <LoadingBar height={3} color='#39FF14' progress={this.state.progress}/>
        <Router>
        <NavBar/>
        <Switch>
          <Route exact path="/"><News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize="5" country='in' category='general'/></Route>
          <Route exact path="/business"><News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize="5" country='in' category='business'/></Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize="5" country='in' category='entertainment'/></Route>
          <Route exact path="/general"><News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize="5" country='in' category='general'/></Route>
          <Route exact path="/health"><News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize="5" country='in' category='health'/></Route>
          <Route exact path="/science"><News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize="5" country='in' category='science'/></Route>
          <Route exact path="/sports"><News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize="5" country='in' category='sports'/></Route>
          <Route exact path="/technology"><News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize="5" country='in' category='technology'/></Route>
          
        </Switch>
        </Router>
      </div>
    )
  }
}

