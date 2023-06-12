/*
    @author: Ray <h.lei3@newcastle.ac.uk>

    @description:
        Defines a React component LineAction, which is used to display a label and an Action (such as a switch or checkbox)
        in one line. It contains a Box component with a label and icon on the left and an Action component on the right,
        which can be changed in height as needed.
*/

import './Shared.css'
import styled from 'styled-components';

// define the box style component
const Box = styled.div`
  display: flex;
  display: -webkit-flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  color: var(--text-color);
  font-size: 20px
`
//define the leftbox style component
const LeftBox = styled.div`
  display: flex;
  display: -webkit-flex;
  align-items: center;
`
// Define the LineAction component to display a Label and an Action (such as a Switch or Checkbox) in a single line
export default ({label, Action, height, Icon, checked, defaultValue, onChange}) => {
    return (
        <Box style={{height: height ? `${height}px` : 'unset'}}>
            <LeftBox>
                <div>
                    {/*if an icon is provided add the icon*/}
                    {Icon ? <Icon style={{fontSize: '32px', marginRight: '10px'}}/> : <></>}
                </div>
                <div>{label}</div>
            </LeftBox>
            <div>
                {/*add action component*/}
                <Action onChange={onChange} defaultChecked={checked} defaultValue={defaultValue}/>
            </div>
        </Box>
    )
}