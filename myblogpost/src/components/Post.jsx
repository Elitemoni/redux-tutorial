import React from 'react'

const Post = ({ post }) => {
   return (
      <article>
         <h3>{post.title}</h3>
         <p>{post.content.substring(0,100)}</p>
         <span title={post.date}>{post.date}</span>
      </article>
   )
}

export default Post