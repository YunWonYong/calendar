import type { FC, InputHTMLAttributes, ReactNode } from "react";


export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    labelClassName?: string;
    containerClassName?: string;
    children?: ReactNode;
};

export const TextInput: FC<TextInputProps> = ({ id, label, labelClassName = "", containerClassName = "", children, ...restProps }) => {
    return (
        <label 
            className={ containerClassName }
            htmlFor={ id }
        >
            {
                label && (
                    <span className={ labelClassName }>
                        { label }
                    </span>
                )
            }
            <input
                id={ id }
                { ...restProps }
            />
            {
                children
            }
        </label>
    );
};