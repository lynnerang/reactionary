import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Main from './Main.js';
import Navigation from './Navigation.js';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      loading: true
    }
  }

  componentDidMount() {
    fetch('https://fe-apps.herokuapp.com/api/v1/memoize/1901/lynnerang/reactterms')
    .then(data => data.json())
    .then(data => this.setState({data: data.reactTerms, loading: false})) 
    .catch(error => console.error(error))
  }

  toggleNav = () => {
    //add state and try conditional rendering
    document.querySelector('aside').classList.toggle('show');
  }

  render() {
    let page;

    if (this.state.loading) {
      page = 'loading...'
    } else {
      page = (
        <div className='App'>
          <div className='hamburger' onClick={this.toggleNav}><i className='fas fa-bars'></i></div>
          <header className='App-header'>
            <div className='App-header-left'>
              <img className='App-logo' src={logo} alt='site logo'/>
              <h1><span>REACT</span>ionary</h1>
            </div>
            <div className='App-header App-header-right'></div>
          </header>
          <div className='App-content'>
            <aside><Navigation /></aside>
            <Main data={this.state.data} />
          </div>
        </div>
      );
    }

    return page;
  }
}

export default App;
