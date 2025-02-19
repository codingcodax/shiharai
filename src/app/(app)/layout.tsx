import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';

import { ourFileRouter } from '~/app/api/uploadthing/core';
import { Navbar } from './_components/navbar';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      {children}
      <Navbar />
    </>
  );
};

export default Layout;
