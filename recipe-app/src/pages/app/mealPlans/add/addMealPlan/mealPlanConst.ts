import { MealPlan, Plan, PlanDay } from "./types";

export const initDay: PlanDay = {
	Śniadanie: "",
	"Drugie Śniadanie": "",
	Zupa: "",
	"Drugie danie": "",
	Kolacja: "",
};

export const initPlan: Plan = {
	Poniedziałek: initDay,
	Wtorek: initDay,
	Środa: initDay,
	Czwartek: initDay,
	Piątek: initDay,
	Sobota: initDay,
	Niedziela: initDay,
};

export const initialValues: MealPlan = {
	name: "",
	description: "",
	plan: initPlan,
	dateFrom: "",
};
