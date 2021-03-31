import Link from 'next/link'
import React from 'react';
import 'components/users/personalAreaForm'
import FormPersonalArea from 'components/users/personalAreaForm';




export default function PersonalArea(){
  return (
    <>
      <div id="root">
        <FormPersonalArea />   
      </div>
      <Link href="/changePassword">
        <button>Change your password!</button>
      </Link>
    </>
  )
}


