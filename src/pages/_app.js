import { SessionProvider } from "next-auth/react";
import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import "../styles/globals.css";
import "@mantine/core/styles.css";

const theme = createTheme({
	/** Put your mantine theme override here */
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {

	return (
		<SessionProvider session={session}>
			<MantineProvider theme={theme}>
				<ModalsProvider>
					<Component {...pageProps} />
				</ModalsProvider>
			</MantineProvider>
		</SessionProvider>
	);
}
