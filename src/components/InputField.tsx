import { InputFieldT } from "@/types/FormTypes"

const InputField = ({type, name, placeholder,label, register, error}:InputFieldT) => {
    return (

<div className="input-box">
  <label className="label-text">{label}</label>
  <div className="form-group">
    <span className="la la-user form-icon" />
    <input {...register(name)} className="form-control"  type={type}
                name={name} 
                autoComplete="off"
                placeholder={placeholder} 
                id={`field_${name}`}  />
                { error && <span className=" text-red-500 py-1">{error.message}</span> }
  </div>
</div>
    )
};

export default InputField;