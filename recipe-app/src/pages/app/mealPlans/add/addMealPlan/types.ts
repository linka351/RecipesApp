import { DayName } from "../../../../../types/MealPlan";

export type MealPlan = {
	[key in DayName]?: {
		[mealName: string]: string;
	};
};

export type WeeklyPlan = {
	userId?: string;
	id?: string;
	name: string;
	description: string;
	dateFrom: string;
	mealName: string[];
	status: "public" | "private";
	// to jest ok?
	plan: MealPlan;
};
