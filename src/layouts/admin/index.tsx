// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { useState } from 'react';
import UserReports from '../../views/admin/default';
import Marketplace from '../../views/admin/marketplace';
import Overview from '../../views/admin/profile';
import DataTables from '../../views/admin/dataTables';
// import RTL from '../../views/admin/rtl';
import SignIn from '../../views/auth/signIn';

import { Route, Routes, Navigate } from 'react-router-dom';
import routes from 'routes';

export default function Dashboard(props: { [x: string]: any }) {
	const { ...rest } = props;
	const [ fixed ] = useState(false);
	const [ toggleSidebar, setToggleSidebar ] = useState(false);
	// const getRoute = () => {
	// 	return window.location.pathname !== '/admin/full-screen-maps';
	// };
	const getActiveRoute = (routes: RoutesType[]): string => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].name;
			}
		}
		return activeRoute;
	};
	const getActiveNavbar = (routes: RoutesType[]): boolean => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].secondary;
			}
		}
		return activeNavbar;
	};
	const getActiveNavbarText = (routes: RoutesType[]): string | boolean => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].name;
			}
		}
		return activeNavbar;
	};
	// const getRoutes = (routes: RoutesType[]): any => {
	// 	return routes.map((route: RoutesType, key: any) => {
	// 		console.log(route.layout + route.path);			
	// 		if (route.layout === '/admin') {
	// 			return <Route path={route.layout + route.path} element={<route.component/>} key={key} />;
	// 		} else {
	// 			return null;
	// 		}
	// 	});
	// };
	document.documentElement.dir = 'ltr';
	const { onOpen } = useDisclosure();
	return (
		<Box>
			<SidebarContext.Provider
				value={{
					toggleSidebar,
					setToggleSidebar
				}}>
				<Sidebar routes={routes} display='none' {...rest} />
				<Box
					float='right'
					minHeight='100vh'
					height='100%'
					overflow='auto'
					position='relative'
					maxHeight='100%'
					w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
					maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
					transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
					transitionDuration='.2s, .2s, .35s'
					transitionProperty='top, bottom, width'
					transitionTimingFunction='linear, linear, ease'>
					<Portal>
						<Box>
							<Navbar
								onOpen={onOpen}
								logoText={'Horizon UI Dashboard PRO'}
								brandText={getActiveRoute(routes)}
								secondary={getActiveNavbar(routes)}
								message={getActiveNavbarText(routes)}
								fixed={fixed}
								{...rest}
							/>
						</Box>
					</Portal>

					{/* {getRoute() ? ( */}
						<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
							<Routes>
								<Route path='/admin/default' element={<UserReports />} key={1} />
								<Route path='/admin/nft-marketplace' element={<Marketplace />} key={2} />
								<Route path='/admin/data-tables' element={<DataTables />} key={3} />
								<Route path='/admin/profile' element={<Overview />} key={4} />
								<Route path='/auth/sign-in' element={<SignIn />} key={5} />
								<Route path='/' element={<Navigate replace={true} to='/admin/default' />} key={7} />
							</Routes>
						</Box>
					{/* ) : null} */}
					<Box>
						<Footer />
					</Box>
				</Box>
			</SidebarContext.Provider>
		</Box>
	);
}
