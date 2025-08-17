import { Navbar } from './_components/navbar';

const Layout = ({ children }: React.PropsWithChildren) => {
	return (
		<>
			{children}
			<Navbar />
		</>
	);
};

export default Layout;
