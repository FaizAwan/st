import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const profileSchema = Yup.object({
    name: Yup.string().nullable(),
    photo: Yup.string().nullable(),
    urdu_name: Yup.string().nullable()  // Add this field
});

export const useProfileValidation = () => useForm({
    resolver: yupResolver(profileSchema)
});

const profilePasswordSchema = Yup.object({
    password: Yup.string().nullable(),   
});

export const useProfilePasswordValidation = () => useForm({
    resolver: yupResolver(profilePasswordSchema)
});
