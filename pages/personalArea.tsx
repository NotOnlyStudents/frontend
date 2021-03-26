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

function Pag({ _authState, _username}){
  changePass();
  return (
    <Layout _authState = {_authState} _username = {_username}>
      <div>
      </div>
    </Layout>
  )
}

//YESSS!
async function changePass()
{
  let user = await Auth.currentAuthenticatedUser();

let result = await Auth.updateUserAttributes(user, {
    'name': 'paolo'
});
console.log(result);


  const { attributes } = await Auth.currentAuthenticatedUser();
  console.log(attributes);
}


export async function getServerSideProps(context)
{  
  const { Auth } = withSSRContext(context);
  const user: CognitoUser = await Auth.currentAuthenticatedUser();
  try {
    return {
      props: {
        _authState: AuthState.SignedIn,
        _username: user.getUsername(),
      }
    }
  } catch (err) {
    return {
      props: {
        _authState: AuthState.SignedOut
      }
    }
  }
}

export default Pag