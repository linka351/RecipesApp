import { DayName } from "../../../../../types/MealPlan";

type Meal =
	| "Śniadanie"
	| "Drugie Śniadanie"
	| "Zupa"
	| "Drugie danie"
	| "Kolacja";
export type PlanColumn = {
	name: string;
	meal: string;
};

//to najpewniej powinny być tablice, a nie obiekt, ale nie chciało mi się pół apki przepisywać i firebase
//jak dorobisz przypisywanie planu do konkretnego tygodnia to się zobaczy jak będzie lepiej
export type PlanDay = {
	[meal in Meal]: string;
};

export type Plan = {
	[key in DayName]: PlanDay;
};

export type MealPlan = {
	name: string;
	description: string;
	dateFrom: string;
	plan: Plan;
};
