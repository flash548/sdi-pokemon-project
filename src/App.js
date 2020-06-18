import React from 'react';
import Search from './Search'
import PokemonFetch from './PokemonFetcher'
import Collection from './Collection'
import GroceryList from './GroceryList'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      'offset': 0, 
      'increment': 10, 
      'isDetail' : false, 
      'currentChar': '',
      'collection': [],
      'showCollection': false,
    }

    this.decrOffset = this.decrOffset.bind(this);
    this.incrOffset = this.incrOffset.bind(this);
    this.showAll = this.showAll.bind(this);
    this.setCurrentChar = this.setCurrentChar.bind(this);
    this.searchChar = this.searchChar.bind(this);
  }

  decrOffset (event) {
    let newOffset = this.state.offset - this.state.increment;
    if (newOffset < 0) { newOffset = 0; }
    this.setState({'offset': newOffset})
    event.preventDefault()
}

  incrOffset (event) {
      let newOffset = this.state.offset + this.state.increment;
      if (newOffset > 963 ) { newOffset = 963; }  //magic number - 963 total pokemon
      this.setState({'offset': newOffset })
      event.preventDefault()
  }

  showAll (event) {
    this.setState({'isDetail' : false, 'isSearch': false})
    event.preventDefault()
  }

  setCurrentChar(event) {
    this.setState({'isDetail' : true, 'isSearch': false, 'currentChar': event.target.id} )
  }

  searchChar(event) {
    this.setState({'isSearch': true, 'isDetail': false, 'currentChar': document.getElementById('searchBox').value })
    event.preventDefault()
  }

  addToCollection = (obj) => {   
    this.setState({'collection': [...this.state.collection, obj]})
  }

  toggleCollection = (event) => {
    this.setState({'showCollection': !this.state.showCollection})
  }

  charIsInCollection = (id) => {
    for (let item of this.state.collection)  {
      if (item.id === id) { return true; }
      return false;
    }
    
  }

  removeFromCollection = (obj) => {   
    var chars = []
    for (let collChar of this.state.collection) {
      if (collChar.id === obj.id) continue;
      else chars.push(collChar)
    }
    this.setState({collection: chars})
  }

  render() {
    console.log("APP REFRESH")
    let command = 'showall'
    if (this.state.isDetail) command = 'detail'
    else if (this.state.isSearch) command = 'search'

    if (this.state.showCollection) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Pokemon</h1>
          </header>
          <Search data={this}/><br/>
          <div class={'main'}>
            <PokemonFetch parent={this} cmd={command} isDetail={this.state.isDetail} id={this.state.currentChar} offset={this.state.offset} increment={this.state.increment}/>
            <Collection parent={this} data={this.state.collection}/>
          </div>
        </div>
      );
    }
    else {
      // don't show collection
      return (
        <div className="App">
          <header className="App-header">
            <h1>Pokemon</h1>
          </header>
          <Search data={this}/><br/>
          <div class={'main'}>
            <PokemonFetch parent={this} cmd={command} isDetail={this.state.isDetail} id={this.state.currentChar} offset={this.state.offset} increment={this.state.increment}/>
          </div>
        </div>
      );


    }

  }
}

export default App;
