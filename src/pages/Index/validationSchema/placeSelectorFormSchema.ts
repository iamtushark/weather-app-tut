import * as yup from "yup";

export const placeSelectorSchema = yup.object().shape({
  place: yup.string().required("Place is required"),
});

export default placeSelectorSchema;
