import type { FC, InputHTMLAttributes } from "react";


export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    labelClassName?: string;
    containerClassName?: string;
};

export const TextInput: FC<TextInputProps> = ({ id, label, labelClassName = "", containerClassName = "", ...restProps }) => {
    return (
        <label className={ containerClassName }>
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
        </label>
    );
};