import React from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const insertUserToDatabase = async () => {
		let userObject = { id: user.sub, email: user.email };

		await fetch("http://localhost:8080/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userObject),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			});
	};

	useEffect(() => {
		if (user) insertUserToDatabase();
	}, [user]);

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated && (
			<div>
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</div>
		)
	);
};

export default Profile;
