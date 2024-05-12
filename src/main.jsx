import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes, { queryClient } from './routes/Routes.jsx';
import AuthProvider from './authprovider/Authprovider.jsx';
import { QueryClientProvider } from '@tanstack/react-query';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider><RouterProvider router={routes} /></AuthProvider>
		</QueryClientProvider>

	</React.StrictMode>,
);
