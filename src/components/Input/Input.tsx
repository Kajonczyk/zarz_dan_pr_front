import "./Input.style.scss"
import {FormEvent} from "react";

interface InputProps {
    onChange: (e: FormEvent<HTMLInputElement>) => void,
    value?: string | number | undefined,
    label: string | JSX.Element,
    hasError?: boolean,
}

export const Input = ({label, onChange, hasError, ...rest}: InputProps) => {

    return <label className={"w-100 flex flex-column"}>
        <span className={"inputLabel"}>{label}&nbsp;</span>
        <input className={`input ${hasError ? "inputError" : ""}`} onChange={onChange} {...rest}/>
    </label>


}