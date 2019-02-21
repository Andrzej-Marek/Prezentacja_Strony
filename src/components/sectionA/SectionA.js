import React, { Component } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import axios from "axios";
import PhotoList from "../photoList/PhotoList";

const Wrapper = styled.div`
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
`;

const PaginateContainer = styled.div`
  ul {
    list-style: none;

    li {
      :first-child {
        background: grey;
      }

      :last-child {
        background: grey;
      }

      display: inline-block;
      padding: 10px;
      background: #f57e7e;
    }
  }
`;
const ColumnOne = styled.div`
  @media (min-width: 800px) {
    grid-column-start: 1;
    grid-column-end: 7;
  }
`;

const WelcomeText = styled.div`
  text-align: center;
  transform: rotate(180deg);
`;

// COLUMN TWO

const ColumnTwo = styled.div`
  @media (min-width: 800px) {
    grid-column-start: 7;
    grid-column-end: 13;

    padding-left: 4em;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Img = styled.img`
  border-radius: 60pt;

  :hover {
    transition: 0.5s;
    border-radius: 0;
  }
`;

export class SectionA extends Component {
  state = {
    data: [],
    pageCount: 417,
    start: 0,
    end: 12,
    selectedImage: null
  };

  componentDidMount = () => {
    this.loadPhotosFromServer();
  };

  loadPhotosFromServer = () => {
    const { start, end } = this.state;
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_start=${start}&_end=${end}`
      )
      .then(res => this.resDataToState(res.data));
  };

  resDataToState = async data => {
    this.setState({ data });
  };

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 12);

    this.setState({ start: offset, end: offset + 12 }, () => {
      this.loadPhotosFromServer();
    });
  };

  //WPISANY JAKO PROP
  showImage = image => {
    this.setState({ selectedImage: image });
  };

  render() {
    console.log(this.state);
    const { data, selectedImage } = this.state;
    return (
      <Wrapper>
        <ColumnOne>
          <WelcomeText>Welcome back!</WelcomeText>
          <PhotoList data={data} showImage={this.showImage} />
          <PaginateContainer>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={4}
              onPageChange={this.handlePageClick}
            />
          </PaginateContainer>
        </ColumnOne>
        <ColumnTwo>
          <ImageWrapper>
            {selectedImage && <Img src={selectedImage} alt="" />}
          </ImageWrapper>
        </ColumnTwo>
      </Wrapper>
    );
  }
}

export default SectionA;
