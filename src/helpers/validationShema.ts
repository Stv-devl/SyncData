'use client';

import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});

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

export const createFolderSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Folder name must be at least 2 characters')
    .required('Folder name is required'),
  checkbox: Yup.string().required('You must select a folder'),
});

export const ulpoadFileSchema = Yup.object().shape({
  name: Yup.string().required('You should browse a file'),
  checkbox: Yup.string().required('You must select a folder'),
});
