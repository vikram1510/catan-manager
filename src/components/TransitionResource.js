import React from 'react'
import { Transition } from 'react-transition-group';
import assets from '../lib/assets'
import styled from 'styled-components'

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

const TransitionResource = ({ in: inProp, resource, onClickHandler, disabled }) => (
  <Transition in={inProp} timeout={duration}>
    {state => {
      return (
        <div style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          <Resource
            className="resource-image-wrapper animated bounceIn"
            disabled={disabled}
            key={resource}
            onClick={inProp ? onClickHandler : null}>
            <img src={assets[resource]} alt={resource}></img>
          </Resource>
        </div>
      )
    }}
  </Transition>
);

const Resource = styled.div`
padding: 0 5px;
width:30px;

  div {
    text-align:center;
  }

  img {
    height: auto;
    width: 100%;
  }
`

export default TransitionResource