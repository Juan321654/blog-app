import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import Layout from '../../components/shared/Layout/Layout'
import { getPost, updatePost } from '../../services/posts'

const PostEdit = (props) => {

  const [post, setPost] = useState({
    title: '',
    content: '',
    imgURL: '',
  })

  const [isUpdated, setUpdated] = useState(false)
  let { id } = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(id)
      setPost(post)
    }
    fetchPost()
  }, [id])


  const handleChange = (event) => {
    const { name, value } = event.target
    setPost({
      ...post,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let { id } = props.match.params
    const updated = await updatePost(id, post)
    setUpdated(updated)
  }

  if (isUpdated) {
    return <Redirect to={`/posts/${props.match.params.id}`} />
  }

  return (
    <Layout user={props.user}>
      <div className="post-edit">
        <div className="image-container">
          <img className="edit-post-image" src={post.imgURL} alt={post.title} />
          <form onSubmit={handleSubmit}>
           <label>ImgURL:</label>
            <input
              className="edit-input-image-link"
              placeholder='Image Link'
              value={post.imgURL}
              name='imgURL'
              required
              onChange={handleChange}
            />
          </form>
        </div>
        <form className="edit-form" onSubmit={handleSubmit}>
        <label>Title:</label>
          <input
            className="input-title"
            placeholder='Title'
            value={post.title}
            name='title'
            required
            autoFocus
            onChange={handleChange}
          />
          <label>Content:</label>
          <textarea
            className="textarea-content"
            rows={10}
            cols={78}
            placeholder='Content'
            value={post.content}
            name='content'
            required
            onChange={handleChange}
          />
          <button type='submit' className="save-button">Save</button>
        </form>
      </div>
    </Layout>
  )
};

export default PostEdit;