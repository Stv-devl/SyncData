'use client';

import * as Yup from 'yup';

/**
 * Login validation schema
 * @constant
 * @type {Yup.ObjectSchema}
 */
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});

/**
 * Signup validation schema
 * @constant
 * @type {Yup.ObjectSchema}
 */
export const signupValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
  repeat: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Password is required'),
});

/**
 * Create folder validation schema
 * @constant
 * @type {Yup.ObjectSchema}
 */
export const createFolderSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Folder name must be at least 3 characters')
    .max(20, 'Folder name must not exceed 20 characters')
    .required('Folder name is required'),
  checkbox: Yup.string().required('You must select a folder'),
});

/**
 * Upload file validation schema
 * @constant
 * @type {Yup.ObjectSchema}
 */
export const ulpoadFileSchema = Yup.object().shape({
  name: Yup.string().required('You should browse a file'),
  checkbox: Yup.string().required('You must select a folder'),
});

/**
 * Update file name validation schema
 * @constant
 * @type {Yup.ObjectSchema}
 */
export const updateFileNameSchema = Yup.object({
  filename: Yup.string()
    .trim()
    .min(3, 'Should be at least 3 characters')
    .max(20, 'Should not exceed 20 characters')
    .required('Folder is required'),
});

/**
 * Profile validation schema
 * @constant
 * @type {Yup.ObjectSchema}
 */
export const profileValidationSchema = Yup.object().shape({
  firstname: Yup.lazy((value) =>
    value === undefined
      ? Yup.string()
      : Yup.string().min(2, '2 characters minimum').required("Can't be empty")
  ),
  lastname: Yup.lazy((value) =>
    value === undefined
      ? Yup.string()
      : Yup.string().min(2, '2 characters minimum').required("Can't be empty")
  ),
  email: Yup.lazy((value) =>
    value === undefined
      ? Yup.string()
      : Yup.string().email('Invalid email address').required("Can't be empty")
  ),
});
