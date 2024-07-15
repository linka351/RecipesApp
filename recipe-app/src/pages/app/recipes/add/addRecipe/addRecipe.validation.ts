import * as yup from "yup";

const instructionValidation = yup
	.string()
	.min(5, "Instrukcja musi składać się z co najmniej 5 znaków");

export const instructionSchema = yup.object().shape({
	instruction: instructionValidation,
});

const ingredientValidation = yup
	.string()
	.min(3, "Nazwa składniku powinna składać się conajmniej z trzech liter");

export const ingredientSchema = yup.object().shape({
	ingredient: ingredientValidation,
});

export const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required("Pole wymagane")
		.min(3, "Pole dłuzsze niż 3 znaki"),
	description: yup
		.string()
		.required("Pole wymagane")
		.min(5, "Opis musi składać się z więcej niż 5 liter"),
	instructions: yup
		.array()
		.of(instructionValidation)
		.min(2, "Przynajmniej dwie instrukcje są wymagane"),
	ingredients: yup
		.array()
		.of(ingredientValidation)
		.min(3, "Wymagane przynajmniej trzy składniki"),
});
