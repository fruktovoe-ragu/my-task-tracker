import React from 'react';
import { block } from 'bem-cn';
import CancelIcon from "../../icons/cross";
import { Button } from "@fruktovoe-ragu/symmetricci";
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
                        variant="neutral"
                        size="small"
                        rank="tertiary"
                        icon={<CancelIcon />}
                        onClick={onCancelClick}
                    />
                </div>
                <div className={b('content')}>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default MobileSideBlock;
