import './App.css';
import Photos from './components/photos';
import React, {Component} from 'react';
import SearchField from "react-search-field";
import {Button, Modal, Container, Row, Col} from 'react-bootstrap';
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
  onChange(e) {
    console.log(e.target.value)
    this.setState({ 
      searchText: e.target.value
    });
  } 

  render() {
    return (
      <div id="app">
      <Navbar bg="light" expand="lg" sticky="top" className="center-navbar navbar-dark bg-dark">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
          >
            <Container>
              <Row>
                <Col className="nav justify-content-center"><Navbar.Brand href="#"><h2>Search Photos</h2></Navbar.Brand></Col>
              </Row>
              <Row>
                <Col><input type='text' size="50" className="form-control col-lg-8" type="search" placeholder="Search..." aria-label="Search" className="searchField" onChange={(e) => this.onChange(e)} /></Col>
              </Row>
            </Container>
          </Nav>
      </Navbar>
      <div >
      <Photos key={this.state.searchText} searchText={this.state.searchText} /> {/*with the use of key it renders everytime it changes so component will mount works for search as well*/}
      {/*<Photos searchText={this.state.searchText} />*/} {/* can work with getDerivedStateFromProps but having trouble re rendering it*/}
      </div> 
      </div>
    )
  }
}

export default App;