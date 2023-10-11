import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timeline } from "rsuite";
import styled from "styled-components";

export const Label = styled.div`
  font-size: 12;
  color: grey;
`;

export const Title = styled.div`
  width: 100%;
  font-size: 16;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Subtitle = styled.h6`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const CustomFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  margin-right: 10px;
`;

export const CustomTimeline = styled(Timeline)`
  .svg-inline--fa {
    position: absolute;
    background: #fff;
    top: -05px;
    left: 25px;
    border: 2px solid #ddd;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 18px;
    color: #999;
    margin-left: -13px;
    justify-content: center;
    padding: 8px;
  }

  .rs-timeline-item-content p {
    padding-top: 10px;
    margin-left: 60px;
    margin-bottom: 40px;
  }

  .rs-timeline-item-tail {
    margin-left: 37px;
  }
`;
