import Link from 'next/link';
import React from 'react';
import FormPersonalArea from 'components/users/personalAreaForm';
import { Button } from '@material-ui/core';

export default function PersonalArea() {
  return (
    <>
      <div id="root">
        <FormPersonalArea />
      </div>
      <Link href="/changePassword">
        <Button>Change your password!</Button>
      </Link>
    </>
  );
}
