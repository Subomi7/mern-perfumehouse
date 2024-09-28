import * as yup from 'yup';

export const signUpSchema = yup
  .object({
    firstName: yup.string().required('firstname is required'),
    lastName: yup.string().required('lastname is required'),
    email: yup
      .string()
      .required('email is required')
      .email('invalid email format'),
    password: yup
      .string()
      .required('password is required')
      .min(8, 'minimum length of password should be atleast 8 characters'),
    confirmPassword: yup.string().required('confirm password is required').min(8, 'minimum length of password should be atleast 8 characters').oneOf([yup.ref(yup.ref('password'))], "password do not match"),
  })
  .required();
