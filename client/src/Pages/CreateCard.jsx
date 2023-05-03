import React from "react";
import CreateCardForm from "../components/CreateCardForm";
import CreateCardModal from "../components/CreateCardModal";

function CreateCard() {
	return (
		<div>
			<CreateCardForm />
			<CreateCardModal />
		</div>
	);
}

export default CreateCard;
