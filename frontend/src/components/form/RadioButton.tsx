import type { FC } from "react";

export interface RadioButtonProps {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    disabled?: boolean;
    label?: React.ReactNode;

    containerClassName?: string;
    labelClassName?: string;

    onChange: (value: string) => void;
};

export const RadioButton: FC<RadioButtonProps> = ({ id, name, value, checked, disabled = false, label, containerClassName = "", labelClassName = "", onChange, }) => {
    return (
        <label
            htmlFor={ id }
            className={ containerClassName }
        >
            <input
                id={ id }
                name={ name }
                type="radio"
                value={ value }
                checked={ checked }
                disabled={ disabled }
                onChange={ (event) => onChange(event.target.value) }
            />

            {
                label && (
                    <span className={ labelClassName }>
                        { label }
                    </span>
                )
            }
        </label>
    );
};