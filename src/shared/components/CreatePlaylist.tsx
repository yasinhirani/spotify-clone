/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, Form, Formik } from "formik";
import { createPlaylistValidationSchema } from "../utilities/validations/createPlaylist.validations";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../features/userPlaylist/userPlaylist";
import { useCreateUserPlaylistMutation } from "../../core/utilities/service/core.service";

function CreatePlaylist() {
  const dispatch = useDispatch();

  const { authData } = useSelector((state: any) => state.Auth);

  const [createPlaylist, { isLoading }] = useCreateUserPlaylistMutation();

  const initialValues = {
    name: "",
    description: "",
  };

  const handleSubmit = async (values: any) => {
    const playlistObj = { ...values, userId: authData.id };
    await createPlaylist(playlistObj);
    dispatch(setModalOpen(false));
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center px-5">
      <div className="main-bg w-96 h-auto p-5 rounded-md animate-scale">
        <h4 className="text-white font-semibold text-2xl mb-5">
          Create Playlist
        </h4>
        <Formik
          initialValues={initialValues}
          validationSchema={createPlaylistValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => {
            return (
              <Form className="flex flex-col space-y-6">
                <div className="space-y-5 flex-grow">
                  <div className="relative">
                    <p className="text-white font-medium mb-2">Name:</p>
                    <Field
                      className="w-full bg-transparent border border-gray-400 rounded-md px-2 py-2 focus:outline-none text-white text-sm"
                      name="name"
                      id="name"
                      value={values.name}
                      autoComplete="off"
                    />
                    {errors.name && touched.name ? (
                      <p className="font-semibold text-xs text-red-500 absolute -bottom-5">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div className="relative">
                    <p className="text-white font-medium mb-2">Description:</p>
                    <Field
                      as="textarea"
                      rows={4}
                      className="w-full bg-transparent border border-gray-400 rounded-md px-2 py-2 focus:outline-none text-white text-sm"
                      name="description"
                      id="description"
                      value={values.description}
                      autoComplete="off"
                    />
                    {errors.description && touched.description ? (
                      <p className="font-semibold text-xs text-red-500 absolute -bottom-4">
                        {errors.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center space-x-5">
                  <button
                    type="reset"
                    className="w-full font-medium border border-white text-white rounded-xl p-2 disabled:opacity-60"
                    onClick={() => dispatch(setModalOpen(false))}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full font-medium border border-white bg-white rounded-xl p-2 disabled:opacity-60"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating" : "Create"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default CreatePlaylist;
