import './App.css';
import Photos from './components/photos';
import React, {Component} from 'react';
import SearchField from "react-search-field";
import {Navbar,Nav} from 'react-bootstrap';



export class App extends Component {

  constructor(){
    super();
    this.state = {
      searchText: '' //search text
    }
    this.onChange = this.onChange.bind(this);
  }

  //change handler function for search bar query change
  onChange(v,e) {
    this.setState({ 
      searchText: v 
    });
  } 

  render() {
    return (
      <div id="app">
      <Navbar bg="light" expand="lg" fixed="top" className="App-header center-navbar navbar-dark bg-dark">
        <Navbar.Brand href="#">Search Photos</Navbar.Brand>
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
          >
            <Nav.Link href="https://github.com/kartset/" >
              kartset
            </Nav.Link>
            <SearchField
              placeholder="Search..."
              classNames="searchField"
              onChange={this.onChange}
            />
          </Nav>
      </Navbar>
      <div className="photos">
      <Photos key={this.state.searchText} searchText={this.state.searchText} /> {/*with the use of key it renders everytime it changes so component will mount works for search as well*/}
      {/*<Photos searchText={this.state.searchText} />*/} {/* can work with getDerivedStateFromProps but having trouble re rendering it*/}
      </div> 
      </div>
    )
  }
}

export default App;