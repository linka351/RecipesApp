import { DayName } from "../../../../../types/MealPlan";

export type MealPlan = {
	[key in DayName]?: {
		[mealName: string]: string;
	};
};

export type WeeklyPlan = {
	id?: string;
	name: string;
	description: string;
	dateFrom: string;
	mealName: string[];
	plan: MealPlan;
};
