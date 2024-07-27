import { SubmitButtonT } from "@/types/ButtonTypes"

const SubmitButton = ({label}:SubmitButtonT) => {
    return (
        <div className="flex justify-center mt-6 mb-3">
            <button className="btn btn-primary">{label}</button>
        </div>
    )
}

export default SubmitButton;