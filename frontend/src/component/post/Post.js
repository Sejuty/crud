import React from 'react'

export const Post = (props) => {
    const {title, body } = props.post
    console.log(props.post)

//   const handleClick = (id)=>{
//     alert(id)
//   }

  return (
    <article>
    <div>
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
