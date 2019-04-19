import styled from "styled-components";
function getWidthString(span){
    if(!span) return;
    let width = span / 12 * 100;
    return `width: ${width}%;`;
}
function visible(){
    return `visibility: initial;`
}
function invisible() {
    return `visibility: hidden;display:none;`
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
        ${({ visible_sm }) => visible_sm && visible()};
        ${({ hidden_sm }) => hidden_sm && invisible()};
    }
    @media only screen and (max-width:768px){
        ${({ hidden_xs }) => hidden_xs && invisible()};
        ${({ visible_xs }) => visible_xs && visible()};
    }
    @media only screen and (min-width:992px){
        ${({ md }) => md && getWidthString(md)};
    }
    @media only screen and (min-width:1200px){
        ${({ lg }) => lg && getWidthString(lg)};
    }
`;
