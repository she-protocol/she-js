import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Web3Provider from './components/Web3Provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Web3Provider>
			<App />
		</Web3Provider>
	</React.StrictMode>
);
