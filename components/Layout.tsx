import React from 'react';

import Header from 'components/header/Header';

interface Props {
  children: React.ReactNode,
}

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  );
}

export default Layout;
