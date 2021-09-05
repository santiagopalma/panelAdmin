import React from 'react'

export const MySlide = (props) => {
  return (
  
      <div className="each-slide">
            <div style={{'backgroundImage': `url(${props.imagen})`}}>
           </div>
      </div>
 
  )
}