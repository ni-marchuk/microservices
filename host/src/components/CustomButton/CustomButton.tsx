import "./style.scss";
import * as React from 'react';

type Props = {
    onClick?: () => void;
};
export const CustomButton = (props: Props) => {
    return (
        <button onClick={props.onClick}>
            Кнопочка
        </button>
    );
};