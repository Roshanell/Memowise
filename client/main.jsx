import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import "./src/index.css";
import { Auth0Provider } from "@auth0/auth0-react";
const DOMAIN = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const CLIENTID = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
	
		<Auth0Provider
			domain={DOMAIN}
			clientId={CLIENTID}
			authorizationParams={{
				redirect_uri: window.location.origin,
			}}
		>
			<App />
		</Auth0Provider>

);
