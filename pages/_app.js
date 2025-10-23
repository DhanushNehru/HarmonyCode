import '../styles/globals.css';

import { ThemeProvider } from 'next-themes';
import { VisualizationProvider } from '../context/VisualizationContext';

const MyApp = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<VisualizationProvider>
				<Component {...pageProps} />
			</VisualizationProvider>
		</ThemeProvider>
	)
}

export default MyApp;
