import type { ReactElement, ReactNode } from "react";

type Variants = "primary" | "secondary";

export type ButtonProps = {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: any;
    onClick: () => void;
    fullWidth? : boolean;
}

const variantStyle = {
    "primary": "bg-purple-600 text-white hover:bg-purple-500 transition-all duration-300 cursor-pointer",
    "secondary": "bg-purple-300 text-purple-600 hover:bg-gray-300 transition-all duration-300 cursor-pointer"
}

const defaultStyle = "rounded-md m-2 flex gap-2 items-center";

const sizeVariant = {
    sm: "py-2 px-3",
    md: "py-2 px-4",
    lg: "py-4 px-6",
}

export const Button = (props: ButtonProps) => {
    return (<button className={`${defaultStyle} ${variantStyle[props.variant]} ${sizeVariant[props.size]} ${props.fullWidth? "w-full flex justify-center" : ""}`} onClick={props.onClick}>
        <div>{props.startIcon}</div> <div>{props.text}</div>
    </button>)
}
