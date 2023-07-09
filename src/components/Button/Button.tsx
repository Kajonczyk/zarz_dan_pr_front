import "./Button.style.scss"
interface ButtonProps {
    onClick: () => void,
    text: string
}

export const Button = ({onClick, text}: ButtonProps) => {

    return <button onClick={onClick} className={"button"}>{text}</button>
}