import { startOfISOWeek, endOfISOWeek, parseISO, format } from "date-fns";
import { pl } from "date-fns/locale";

export const formatWeekRange = (weekString: string) => {
	const [year, week] = weekString.split("-W");
	if (!year || !week) return "";
	const weekNumber = parseInt(week, 10);
	const firstDayOfYear = parseISO(`${year}-01-04`);
	const startDate = startOfISOWeek(firstDayOfYear);
	startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
	const endDate = endOfISOWeek(startDate);
	return `${format(startDate, "d MMMM", { locale: pl })} - ${format(endDate, "d MMMM yyyy", { locale: pl })}`;
};
