import React from 'react';
import { block } from 'bem-cn';
import CancelIcon from "../../icons/cross";
import Button from "../../components/Button/Button";
import './MobileSideBlock.css';

const b = block('mobile-side-block');
const MobileSideBlock = ({
    titleContent = '',
    onCancelClick,
    className = '',
    children,
}) => {
    return (
        <section className={b({}).mix(className)}>
            <div className={b('inner')}>
                <div className={b('head')}>
                    <h2 className={b('title')}>{titleContent}</h2>
                    <Button
                        className={b('cancel-button')}
                        onClick={onCancelClick}
                    >
                        <CancelIcon />
                    </Button>
                </div>
                <div className={b('content')}>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default MobileSideBlock;