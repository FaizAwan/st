import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Login validation schema
const loginSchema = Yup.object({
    email: Yup.string().email("Please enter valid email").required("Please fill this field"),
    password: Yup.string().required("Please fill this field").min(6, "Please enter minimum 6 characters for password.")
});

// Register validation schema
const registerSchema = Yup.object({
    email: Yup.string().email("Please enter valid email").required("Please fill this field"),
    password: Yup.string().required("Please fill this field").min(6, "Please enter minimum 6 characters for password."),
    cnfPassword: Yup.string().required("Please fill this field").oneOf([Yup.ref('password')], "Enter password not matched.")
});

// Custom hook for login validation
export const useLoginValidation = () => {
    return useForm({
        resolver: yupResolver(loginSchema)
    });
};

// Custom hook for register validation
export const useRegisterValidation = () => {
    return useForm({
        resolver: yupResolver(registerSchema)
    });
};

// Exporting registerSchema as registerValidation
export const registerValidation = registerSchema;
