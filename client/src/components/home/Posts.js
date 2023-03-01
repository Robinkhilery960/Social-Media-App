import React from 'react'
import { useSelector } from 'react-redux'
import CardHeader from './post_card/CardHeader'
import CardBody from './post_card/CardBody'
import CardFooter from './post_card/CardFooter'

const Posts = () => {
  const {homePosts}=useSelector(state=>state)
  return (
    <>
    {
      homePosts.posts.map(post=>(
        <div key={post._id} className="card my-3">
          <CardHeader post={post}/>
          <CardBody post={post}/>
          <CardFooter post={post}/>
        </div>
      ))
    }
    </>
  )
}

export default Posts