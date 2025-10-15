import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '../context/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';

const MyApp = ({ Component, pageProps }) => {
	return (
		<ErrorBoundary>
			<ThemeProvider attribute="class">
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ThemeProvider>
		</ErrorBoundary>
	)
}

export default MyApp;
