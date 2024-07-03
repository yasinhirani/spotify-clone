import * as Yup from "yup";

const createPlaylistValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().max(500, "Only 500 characters are allowed."),
});

export { createPlaylistValidationSchema };
