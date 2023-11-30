import { createRoot } from 'react-dom/client';
import './assets/css/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<ChakraProvider theme={theme}>
		<Router>
			<Routes>
				{/* <Route path={`/auth`} element={<AuthLayout />} /> */}
				<Route path={`/admin`} element={<AdminLayout/>} />
				{/* <Route path={`/rtl`} element={<RTLLayout/>} /> */}
				<Route path="/" element={<Navigate replace to="/admin" />}  />
			</Routes>
		</Router>

	</ChakraProvider>
);