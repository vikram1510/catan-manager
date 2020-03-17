import React from 'react';
import styled from 'styled-components'

const Card = ({name, amount}) => {



  return(
    <CardWrapper>
      {name} {amount}
    </CardWrapper>
  )
}
 

const CardWrapper = styled.div`
border-radius: 3px;
background-color: red;
color: white;
padding:10px;
width:100px;
`

export default Card
