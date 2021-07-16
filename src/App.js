import './App.css';
import Photos from './components/photos';
import React, {useState} from 'react';
import SearchField from "react-search-field";
import {Navbar,Nav} from 'react-bootstrap';

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  function onChange(v,e) {
    //console.log(v)
    //this.setState({ 
      //searchText: v 
    //});
    setSearchText(v);
    setPageNumber(1);
    //console.log(searchText)
  }
  return (
    <div id="app">
      <Navbar bg="light" expand="lg" fixed="top" className="App-header center-navbar">
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
              onChange={onChange}
            />
          </Nav>
      </Navbar>
      <div className="photos">
        <Photos key={searchText} searchText={searchText} />
      </div> 
    </div>
  )
}