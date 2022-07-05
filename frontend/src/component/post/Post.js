import React from 'react'

export const Post = (props) => {
    const {title, body ,user} = props.post
    console.log(props.post)
    console.log(user.name)

  return (
    <article>
    <div>
      <h4>Name : {user.name}</h4>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
    {/* <div>
      <button>
        <i className="fa fa-trash fa-2x"></i>
      </button>
    </div> */}
  </article>
  )
}
