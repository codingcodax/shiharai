import { NewSubscriptionContextProvider } from './_components/new-subscription-form/context';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <NewSubscriptionContextProvider>
        {children}
      </NewSubscriptionContextProvider>
    </>
  );
};

export default Layout;
