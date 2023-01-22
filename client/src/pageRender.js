import React from 'react'
import { useParams } from 'react-router-dom'

function PageRender() {
    console.log(useParams())
  return (
    <div>PageRender</div>
  )
}

export default PageRender