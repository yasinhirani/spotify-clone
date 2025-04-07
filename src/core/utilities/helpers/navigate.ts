import { NavigateFunction } from "react-router-dom";

export let navigate: NavigateFunction | null = null;

export const setNavigate = (navigateFn: NavigateFunction) => {
  navigate = navigateFn;
};
