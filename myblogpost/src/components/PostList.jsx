import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../store/postSlice'

const PostList = () => {
   const posts = useSelector(selectAllPosts)
   console.log('Posts here: ' + posts)

   return (
      posts.map(post => <Post post={post}/>)
   )
}

export default PostList