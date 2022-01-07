import React, { useState,useEffect } from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import axios from "axios";

const ValidatedLoginForm = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        setSubmitting(false);
      }, 500);
    }}
    validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (!EmailValidator.validate(values.email)) {
          errors.email = "Invalid email address.";
        }
        const passwordRegex = /(?=.*[0-9])/;
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 8) {
          errors.password = "Password must be 8 characters long.";
        } else if (!passwordRegex.test(values.password)) {
          errors.password = "Invalid password. Must contain one number.";
        }
        return errors;
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .matches(/(?=.*[0-9])/, "Password must contain a number.")
      })}
      
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Adress</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email Address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error" }           
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
          />
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </form>
      );
    }}
  </Formik>
);
export default ValidatedLoginForm;