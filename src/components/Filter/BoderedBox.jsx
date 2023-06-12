/*
    @author: Ray <h.lei3@newcastle.ac.uk>

    @description:
        This module implements a React component called BorderedBox. 
        This component is a box with a border that can be used to enclose other components or
        content to differentiate and provide visual separation. Among them, the component 
        includes an optional title (title) and a subcomponent (children). 
        If a title is provided, the title is displayed above the child component with some special styling applied. 
        If no title is provided, only subcomponents are displayed.
*/

import styled from "styled-components";

//Define Box component
const Box = styled.div`
  border: 1px solid rgb(217, 217, 217);
  border-radius: 5px;
  margin-top: 15px;
`
//Define TitleBox component
const TitleBox = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: rgb(100, 100, 100);
  line-height: 1.8em;
`
//Define BorderedBox component that accepts a title and children as props
const BorderedBox = ({title, children}) => {
    return (
        <Box style={{padding: title ? '0 5px 10px' : '10px 5px'}}>
            {
                title ?
                    <TitleBox>
                        {title.toUpperCase()}
                    </TitleBox> : <></>
            }
            {children}
        </Box>
    )
}
export default BorderedBox
