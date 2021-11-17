import React from 'react'
import EditProfileForm from './EditProfileForm'

export default function EditProfile() {
  return (
    <>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>

      <small>* = required field</small>

      <EditProfileForm/>
      
    </>
  )
}
