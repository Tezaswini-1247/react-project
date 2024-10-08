import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Alert from "../Alert/Alert";
const apiUrl = process.env.REACT_APP_API_URL;


export function FormComponent() {
  const initialValues = {
    studentName: "",
    fatherDetails: "",
    motherDetails: "",
    contactNumber: "",
    address: "",
    schoolname: "",
    interestedOnline: false,
    demoDate: "",
    salesRefName: ""
  };
  
  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object({
    studentName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Student Name is required"),
    fatherDetails: Yup.string().required("Father's details are required"),
    motherDetails: Yup.string().required("Mother's details are required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    address: Yup.string().required("Address is required"),
    schoolname: Yup.string().required("School Name is required"),
    demoDate: Yup.date().required("Demo Date is required").nullable(),
    salesRefName: Yup.string().required("Sales Reference Name is required"),
    interestedOnline: Yup.boolean(),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      const response = await axios.post(`${apiUrl}/feedback/school`, values);
      console.log("Form submitted successfully", response.data);
      setStatus("Form submitted successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
  
      resetForm();
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus("Failed to submit form.");
      setShowAlert(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Student Feedback Form
          </h2>
          <p className="text-sm text-gray-600">Enter your details here!</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-1">
                    <div className="w-full">
                      <Field
                        name="studentName"
                        type="text"
                        className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        placeholder="Student Name"
                      />
                      <ErrorMessage
                        name="studentName"
                        component="div"
                        className="error-message text-[red] text-sm ms-2"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <Field
                      name="fatherDetails"
                      type="text"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Father Name & Profession"
                    />
                    <ErrorMessage
                      name="fatherDetails"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="motherDetails"
                      type="text"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Mother Name & Profession"
                    />
                    <ErrorMessage
                      name="motherDetails"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="contactNumber"
                      type="text"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Parent Contact Number"
                    />
                    <ErrorMessage
                      name="contactNumber"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="address"
                      type="text"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Residing Address"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="schoolname"
                      type="text"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Enter School or College Name"
                    />
                    <ErrorMessage
                      name="schoolname"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      as="select"
                      name="interestedOnline"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <option value="">Interested in Online Course?</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Field>
                    <ErrorMessage
                      name="interestedOnline"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="demoDate"
                      type="date"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    <ErrorMessage
                      name="demoDate"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="salesRefName"
                      type="text"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Sales Reference Name"
                    />
                    <ErrorMessage
                      name="salesRefName"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>

              {status && (
                <div className="submission-status text-black text-center">
                  {status}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
      {showAlert && <Alert />}
    </div>
  );
}

export default FormComponent;
