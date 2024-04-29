import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { updateTodo } from "../../../api/todo";
import { Todo } from "../Todo";

type ModalProps = {
  todo: Todo;
  onClose: () => void;
};

const validationSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  ready: Yup.boolean().optional(),
});

const UpdateModal = (props: ModalProps) => {
  const queryClient = useQueryClient();
  const { todo, onClose } = props;
  console.log("🚀 ~ Modal ~ todo:", todo);

  const { mutate } = useMutation({
    mutationKey: ["todo"],
    mutationFn: updateTodo,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      onClose();
    },
  });

  const initialValues = {
    name: todo.name,
    description: todo.description,
    ready: todo.ready,
  };

  const onCloseModal = () => {
    onClose();
  };

  const onSubmit = async (values: {
    name: string;
    description: string;
    ready: boolean;
  }) => {
    const { name, description, ready } = values;

    const updateData = {
      ...todo,
      name: name,
      description: description,
      ready: ready,
    };
    mutate(updateData);
  };

  const renderError = (message: string) => (
    <p className="text-red-500">{message}</p>
  );

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="false"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}
          >
            <Form
              action="#"
              method="POST"
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Update todo
                    </h3>
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <Field
                          id="name"
                          name="name"
                          type="name"
                          autoComplete="name"
                          required
                          className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage name="name" render={renderError} />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <Field
                          id="description"
                          name="description"
                          type="description"
                          autoComplete="description"
                          required
                          className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage name="description" render={renderError} />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Ready
                      </label>
                      <div className="mt-2">
                        <Field
                          id="ready"
                          name="ready"
                          type="checkbox"
                          autoComplete="ready"
                          className=""
                        />
                        <ErrorMessage name="name" render={renderError} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Update
                </button>
                <button
                  onClick={onCloseModal}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
