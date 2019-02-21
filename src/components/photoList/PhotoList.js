import React, { Component } from "react";
import styled from "styled-components";

const Li = styled.li`
  padding: 0.5em 0;

  :hover {
    cursor: pointer;
  }
`;
export class PhotoList extends Component {
  render() {
    let commentNodes = this.props.data.map(
      ({ title, id, thumbnailUrl }, index) => {
        return (
          <Li key={id} onClick={() => this.props.showImage(thumbnailUrl)}>
            {title}
          </Li>
        );
      }
    );
    return (
      <div>
        <ul>{commentNodes}</ul>
      </div>
    );
  }
}

export default PhotoList;
