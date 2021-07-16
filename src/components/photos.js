import React, { Component } from 'react';
import axios from 'axios';
import {Button, Modal, Container, Row, Col} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from 'react-infinite-scroll-component';



export default class Photos extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: [],
      name: [],
      page : 1,
      perPage : 150,
      show: false,
      currimg: "",
      currname: ""

    }
  }

  handleClose = () => this.setState({show:false});
  handleShow = (e, index) => {
    console.log(index);
    this.setState({
      show:true,
      currimg: this.state.url[index],
      currname: this.state.name[index]
    })
  };
  addmore = () => {
    this.setState({
      page: this.state.page++
    })
    if(this.props.searchText) {
      axios.get("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=446efc4ee28fd1300964acd1ab1bb110&tags="+this.props.searchText+"&text="+this.props.searchText+"&per_page="+this.state.perPage+"&page="+this.state.page+"&format=json&nojsoncallback=1")
      .then((res) => {
        console.log(this.props.searchText);
        console.log(res.data['photos']['photo']);
        res.data['photos']['photo'].forEach(element => {
          let photoID = element['id']
          let secret = element['secret'];
          let server_id = element['server'];
          console.log(element)
          let size_suffix = "n";
          this.setState({
            url: [...this.state.url, "https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"],
            name: [...this.state.name,element['title']]
          })
        })

      })
    }
    else if(this.props.searchText === "") {
      console.log(this.props.searchText);
      axios.get("https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=446efc4ee28fd1300964acd1ab1bb110&per_page=150&page=1&format=json&nojsoncallback=1")
      .then((res) => {
        res.data['photos']['photo'].forEach(element => {
          //console.log(element);
          let photoID = element['id']
          let secret = element['secret'];
          let server_id = element['server'];
          let size_suffix = "n";
          this.setState({
            url: [...this.state.url ,"https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"],
            name: [...this.state.name,element['title']]
          })
        });
      })
    }
    
  }

  componentDidMount(props) {
    if(this.props.searchText) {
      axios.get("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=446efc4ee28fd1300964acd1ab1bb110&tags="+this.props.searchText+"&text="+this.props.searchText+"&per_page="+this.state.perPage+"&page="+this.state.page+"&format=json&nojsoncallback=1")
      .then((res) => {
        console.log(this.props.searchText);
        console.log(res.data['photos']['photo']);
        res.data['photos']['photo'].forEach(element => {
          let photoID = element['id']
          let secret = element['secret'];
          let server_id = element['server'];
          console.log(element)
          let size_suffix = "n";
          this.setState({
            url: [...this.state.url, "https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"],
            name: [...this.state.name,element['title']]
          })
        })

      })
    } 
    else if(this.props.searchText === "") {
      console.log(this.props.searchText);
      axios.get("https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=446efc4ee28fd1300964acd1ab1bb110&per_page=150&page=1&format=json&nojsoncallback=1")
      .then((res) => {
        res.data['photos']['photo'].forEach(element => {
          //console.log(element);
          let photoID = element['id']
          let secret = element['secret'];
          let server_id = element['server'];
          let size_suffix = "n";
          this.setState({
            url: [...this.state.url ,"https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"],
            name: [...this.state.name,element['title']]
          })
        });
      })
    }
  }
  closeLightbox = () => {
    this.state.open = true;
  };
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
          <Col md={3}>
            <div class="child">
            <div class="card" >
            <button onClick={ (e) => this.handleShow(e, index)}>
              <img class="card-img-top" src={urla}  alt='from Flicker' width= "100% "height= "150vw" />
            </button>                
            <div class="card-body">
              <p class="card-text">
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
        
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header >
          <Modal.Title>{this.state.currname}</Modal.Title>
        </Modal.Header>
        <Modal.Body><img class="img-fluid" src={this.state.currimg}  alt='from Flicker' /></Modal.Body>
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

