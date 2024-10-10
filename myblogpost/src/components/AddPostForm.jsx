import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postAdd } from '../store/postSlice'

const AddPostForm = () => {
   const dispatch = useDispatch()

   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')

   const canSave = title && content

   const savePostClick = () => {
      if (canSave) {
         console.log('button hit')
         dispatch({title, content})
         setTitle('')
         setContent('')
      }
   }

   return (
      <section>
         <h2>Add a New Post</h2>
         <form>
            <label htmlFor="Title">Post Title:</label>
            <input
               type="text"
               id="Title"
               name="Title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="Content">Post Content:</label>
            <input
               type="text"
               id="Content"
               name="Content"
               value={content}
               onChange={(e) => setContent(e.target.value)}
            />
            <button
               type="button"
               onClick={savePostClick}
               disabled={!canSave}>
               Create Post
            </button>
         </form>
      </section>
   )
}

export default AddPostForm