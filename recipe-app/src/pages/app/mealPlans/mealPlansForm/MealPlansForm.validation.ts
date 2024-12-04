import * as yup from "yup";

export const validationSchema = yup.object({
	name: yup
		.string()
		.required("Nazwa planu jest wymagana")
		.min(3, "Nazwa musi mieć co najmniej 3 znaki"),
	description: yup
		.string()
		.required("Opis planu jest wymagany")
		.min(10, "Opis musi mieć co najmniej 10 znaków"),
	dateFrom: yup.string().required("Data rozpoczęcia jest wymagana"),
	mealName: yup
		.array()
		.min(1, "Musisz dodać przynajmniej jeden posiłek do planu"),
	newMealName: yup
		.string()
		.required("Nazwa posiłku jest wymagana.")
		.min(3, "Nazwa posiłku musi mieć przynajmniej 3 znaki."),
});
