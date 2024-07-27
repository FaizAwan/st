// src/context/FormContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormValues {
  fromAddress: string;
  toAddress: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
}

interface FormContextProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    fromAddress: '',
    toAddress: '',
    pickUpDate: '',
    pickUpTime: '0900AM',
    dropOffDate: '',
    dropOffTime: '0900AM',
  });

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
};
