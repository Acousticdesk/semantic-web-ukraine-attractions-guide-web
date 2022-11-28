import { createContext } from "react";
import { AppForm } from "./interfaces";

export const FormContext = createContext<{
  form: AppForm;
  setForm: (form: (prevForm: AppForm) => AppForm) => void;
}>({
  form: {} as AppForm,
  setForm: (form: (prevForm: AppForm) => AppForm) => {},
});
