import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../api/auth";
import useAuth from "../../store/useAuth";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const initialValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const { saveUserInfor } = useAuth();
  const navigate = useNavigate();
  // Declare sign in mutation service
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess(data) {
      saveUserInfor(data);

      navigate("/", { replace: true });
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    mutate({
      email: values.email,
      password: values.password,
    }) as any;
  };

  const renderError = (message: string) => (
    <p className="text-red-500">{message}</p>
  );
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
          }}
        >
          <Form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="email" render={renderError} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="password" render={renderError} />
              </div>
            </div>

            <div>
              <button
                disabled={isPending}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignInForm;
