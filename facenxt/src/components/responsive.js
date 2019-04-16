import styled from "styled-components";
function getWidthString(span){
    if(!span) return;
    let width = span / 12 * 100;
    return `width: ${width}%;`;
}
export const Row = styled.div`
    &::after{
        content: "";
        clear: both;
        display: table;
    }
`;
export const Column = styled.div`
    
    ${({ center }) => (center ? "float: none;margin: 0 auto;" : "float: left;")};
    ${({ xs }) => (xs ? getWidthString(xs): "width:100%")};
    @media only screen and (min-width:768px){
        ${({ sm }) => sm && getWidthString(sm)};
    }
    @media only screen and (min-width:992px){
        ${({ md }) => md && getWidthString(md)};
    }
    @media only screen and (min-width:1200px){
        ${({ lg }) => lg && getWidthString(lg)};
    }
`;
