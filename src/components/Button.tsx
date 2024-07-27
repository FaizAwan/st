import { SubmitButtonT } from "@/types/ButtonTypes";

const SubmitButton = ({ label, type = "button", className = "btn btn-primary" }: SubmitButtonT) => {
    return (
        <div className="flex justify-center mt-6 mb-3">
            <button type={type} className={className}>{label}</button>
        </div>
    );
}

export default SubmitButton;
