import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";
const DOMAIN = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const CLIENTID = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;
const REDIRECTURI = import.meta.env.VITE_APP_AUTH0_CALLBACK_URL;

export const Auth0ProviderWithNavigate = ({ children }) => {
	const navigate = useNavigate();

	const domain = { DOMAIN };
	const clientId = { CLIENTID };
	const redirectUri = { REDIRECTURI };

	const onRedirectCallback = (appState) => {
		navigate(appState?.returnTo || window.location.pathname);
	};

	if (!(domain && clientId && redirectUri)) {
		return null;
	}

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{
				redirect_uri: redirectUri,
			}}
			onRedirectCallback={onRedirectCallback}
		>
	
			{children}
		</Auth0Provider>
	);
};
