import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// // Własny hook useAppDispatch z odpowiednim typem
// export const useAppDispatch: () => AppDispatch =
// 	useDispatch as () => AppDispatch;

// // Własny hook useAppSelector z odpowiednim typem
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
