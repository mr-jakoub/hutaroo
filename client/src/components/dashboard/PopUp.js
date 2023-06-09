import React from 'react'
import { useHistory, Redirect } from "react-router-dom"
import PostForm from '../posts/PostForm'

const PopUp = ({popupForm, match}) => {
    const history = useHistory()
  return (
      <>
        {popupForm ? (
            <>
                <div className={match.params.new === "create" ?"popup-back-container":"d-none"}>
                    <div onClick={()=>history.push("/dashboard")} className="popup-back">
                    </div>
                    {popupForm === "opinion"?(<PostForm />):popupForm === "room"?'room':''}
                </div>
            </>
        ):<Redirect to="/dashboard" />}
      </>
  )
}

export default PopUp