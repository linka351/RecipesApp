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
		.of(yup.string().required("Nazwa posiłku jest wymagana")),
	plan: yup
		.object()
		.test(
			"plan-recipe-selected",
			"Każdy dzień tygodnia musi mieć przypisany przepis",
			value => {
				return Object.values(value || {}).every(day =>
					Object.values(day || {}).every(recipeId => recipeId !== undefined)
				);
			}
		),
});
