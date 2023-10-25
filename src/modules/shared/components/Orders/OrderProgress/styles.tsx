import { Timeline } from "rsuite";
import styled from "styled-components";

export const Label = styled.span`
  font-size: 12px;
  color: grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
`;

export const Title = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Observation = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: grey;
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
