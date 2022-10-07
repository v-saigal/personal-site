import React, { useState } from 'react';
import './Note.css'
import { Link, NavLink } from 'react-router-dom';


const Note = (props) => {

  //const [comment, setComment] = useState();
  //const [showCommentForm, setShowCommentForm] = useState(false);

  const date = new Date(props.note.datePosted).toLocaleDateString("en-uk", {
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
      month: "short",
      weekday: "long",
      day: "numeric",
      })

      const deleteFunction = async (event) => {
        event.preventDefault();
        fetch( '/notes', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
          },
          body: JSON.stringify({ _id: props.note._id })
        })
          .then(response => {
            if(response.status === 201) {
              console.log('OK')
            } else {
              alert('oops something is wrong')
            }
          }).then(() => {props.counterChanger(prevState => ({count: prevState.counter + 1}))})
      }

      const deleteBtnAppears = (() => {if (props.note.noteAuthor===props.userId) {return <button onClick= {deleteFunction} className={"like"} id={"deleteBtn"} title={"Delete note"}>Delete note</button>}})
      const editLinkAppears = (() => {
        if (props.note.noteAuthor===props.userId){
          return <NavLink to={`/notes/edit/${props.note._id}`}>
            Edit
          </NavLink>
        }
      })
return(
      <article data-cy="note" className='note' key={ props.note._id }>

      {/* <div className="container-2">
         <h2 className="post-author con-2-1">{ props.note.noteAuthor }</h2>
      </div> */}

        <div className="con-1-2">
            <h2 className="post-date">{ date }</h2>
      </div>

        <div className="container-4">
          <p className='message con-4-1'>{ props.note.noteContent }</p>
       </div>
       <ul>
       {props.note.tags.map(
                (tag) => ( <li>{tag.name}</li>)
              )}

       {deleteBtnAppears()}
       {editLinkAppears()}
        </ul>
      </article>
)
}

export default Note;
