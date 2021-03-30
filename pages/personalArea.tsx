import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react';
import { GetServerSideProps, InferGetStaticPropsType } from "next"
import { CognitoUser } from "@aws-amplify/auth"
import { withSSRContext } from 'aws-amplify'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { useAuthContext } from "context/authContext"
import Layout from 'components/Layout';
import { Auth } from 'aws-amplify';
import 'components/users/personalAreaForm'
import FormPersonalArea from 'components/users/personalAreaForm';
import ReactDOM from 'react-dom';




export default function PersonalArea({ _authState, _username}){
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


