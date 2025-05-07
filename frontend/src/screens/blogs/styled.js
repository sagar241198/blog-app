import { Box } from "@mui/material";
import styled from "styled-components";

export const HeaderBox = styled(Box)`
    display:flex;
    justify-content:flex-start;
    background: radial-gradient(black, transparent);
    color: white;
`;

export const ManinBox = styled(Box)`
  width: 75%;
  min-width: 375px;
  margin: auto;
  border-radius: 4;
  box-shadow: 6;
 background: #fdfdfd;
`;

export const ImageBox = styled(Box)`
     width: 100%;
     height: 200px;
     border: 2px dashed #aaa;
     border-radius: 3;
     display: flex;
     align-items: center;
     justify-content: center;
     cursor: pointer;
     background-color: #fafafa;
     overflow: hidden
`;

export const ImageTag = styled('img')`
 max-width: 100%;
 max-height: 100%; 
 object-fit: cover;
`;


