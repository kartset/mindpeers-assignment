import React, { Component } from 'react';
import axios from 'axios';
import {Button, Modal, Container, Row, Col} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from 'react-infinite-scroll-component';



export default class Photos extends Component {
  constructor(props){
    super(props);
    this.state = {
      urla: '',  // active url variable is it the getRecent or Search one
      length: 0, //total no of images available to scroll
      url: [], //array for the urls of the images from flickr
      name: [], //titles of the images
      pageRecent : 2, //page no for getRecent
      pageSearch: 2, // page no for search
      perPage : 150, // no of images per page
      show: false, // boolean variable for modal
      currimg: "",  // url of the image clicked
      currname: "", //title of the image clicked
      prevSearchText: '' //for the getDerivedStateFromProps
    }
  }

  //to handle the close button for modal
  handleClose = () => this.setState({show:false});

  //to handle the modal to show the image in a modal
  handleShow = (e, index) => {
    this.setState({
      show:true,
      currimg: this.state.url[index],
      currname: this.state.name[index]
    })
  };

  //when scrolling, this function loads more images at the bottom, using the infiniteScroll lib
  addmore = () => {
    if(this.props.searchText) {
      this.setState({
        pageSearch: this.state.pageSearch+1,
        urla: "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=446efc4ee28fd1300964acd1ab1bb110&tags="+this.props.searchText+"&text="+this.props.searchText+"&per_page="+this.state.perPage+"&page="+this.state.pageSearch+"&format=json&nojsoncallback=1"
      })
    }
    else if(this.props.searchText === "") {
      this.setState({
        pageRecent: this.state.pageRecent+1,
        urla: "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=446efc4ee28fd1300964acd1ab1bb110&per_page=150&page="+this.state.pageRecent+"&format=json&nojsoncallback=1"
      })
    }
    axios.get(this.state.urla)
    .then((res) => {
      res.data['photos']['photo'].forEach((element) => {
        let photoID = element['id']
        let secret = element['secret'];
        let server_id = element['server'];
        let size_suffix = "n";
        this.setState({
          url: [...this.state.url ,"https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"],
          name: [...this.state.name,element['title']? element['title'].slice(0,9) : "Image"]
        })
      })
    })

  }

  /*static getDerivedStateFromProps(props, state) {
    let urlab = [];
    let names = [];
    let len = 0;
    if(props.searchText !== state.prevSearchText) {
      console.log("curr" + props.searchText)
      console.log("prev" + state.prevSearchText)
      axios.get("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=446efc4ee28fd1300964acd1ab1bb110&tags="+props.searchText+"&text="+props.searchText+"&per_page="+state.perPage+"&page=1&format=json&nojsoncallback=1")
      .then((res) => {
        res.data['photos']['photo'].forEach(element => {
          let photoID = element['id']
          let secret = element['secret'];
          let server_id = element['server'];
          let size_suffix = "n";
          urlab = [...urlab, "https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"];
          names = [...names, element['title']? element['title'].slice(0,9) : "Image"]
          len =  res.data['photos'].pages*res.data['photos'].perpage
          
        })
      })
      return {
        prevSearchText: props.searchText,
        url: urlab,
        length: len,
        name: names
      };
    }
    return null;
  }*/

  //get activates everytime this compenent is rendered for getRecent or for search
  componentDidMount() {
    if(this.props.searchText) {
      axios.get("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=446efc4ee28fd1300964acd1ab1bb110&tags="+this.props.searchText+"&text="+this.props.searchText+"&per_page="+this.state.perPage+"&page=1&format=json&nojsoncallback=1")
      .then((res) => {
        res.data['photos']['photo'].forEach(element => {
          let photoID = element['id']
          let secret = element['secret'];
          let server_id = element['server'];
          let size_suffix = "n";
          this.setState({
            url: [...this.state.url, "https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"],
            name: [...this.state.name,element['title'], element['title']? element['title'].slice(0,9) : "Image"],
            length: res.data['photos'].pages*res.data['photos'].perpage
          })
        })

      })
    } 
    else if(this.props.searchText === "") {
      axios.get("https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=446efc4ee28fd1300964acd1ab1bb110&per_page=150&page=1&format=json&nojsoncallback=1")
      .then((res) => {
        res.data['photos']['photo'].forEach(element => {
          let photoID = element['id']
          let secret = element['secret'];
          let server_id = element['server'];
          let size_suffix = "n";
          this.setState({
            url: [...this.state.url ,"https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"],
            name: [...this.state.name,element['title']? element['title'].slice(0,9) : "Image"],
            length: res.data['photos'].pages*res.data['photos'].perpage
          })
        });
      })
    }
  }
  
  render() {
    return (
      <div>
        <InfiniteScroll
          dataLength={this.state.url.length}
          next= {this.addmore}
          hasMore={true}
          loader= {<h4>Loading ...</h4>}
        >
          <Container>
        <Row>
        {this.state.url.map((urla, index) => (
          <Col key={index} md={3}>
            <div className="child">
            <div className="card" >
            <button onClick={ (e) => this.handleShow(e, index)}>
              <img className="card-img-top" src={urla}  alt='from Flicker' width= "100% "height= "200vw" />
            </button>                
            <div className="card-body">
              <p className="card-text">
                {
                  this.state.name[index]
                }
              </p>
            </div>
          </div>
            </div>
          </Col>
        ))}
        </Row>
        </Container>
        </InfiniteScroll>
        
        <Modal animation={false} show={this.state.show} onHide={this.handleClose}>
        <Modal.Header >
          <Modal.Title>{this.state.currname}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="center-align"><img className="img-fluid" src={this.state.currimg}  alt='from Flicker' /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
      
  }
}