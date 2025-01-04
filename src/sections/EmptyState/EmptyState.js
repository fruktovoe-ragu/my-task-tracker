import React from 'react';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import PlusIcon from "../../icons/plus";
import Button from "../../components/Button/Button";
import './EmptyState.css';

const b = block('empty-state');
const EmptyState = ({
    onCreateListClick,
}) => {
    const { isMobile } = useAppContext();

    return (
        <section className={b()}>
            <div className={b('content')}>
                <h2 className={b('title')}>
                    Get started on your productivity journey!
                </h2>
                <p className={b('text')}>
                    Create your first task list to begin tracking and organizing your tasks.
                </p>
            </div>
            <Button
                className={b('button')}
                theme='primary'
                onClick={onCreateListClick}
                isCentered={isMobile}
            >
                <PlusIcon fill="#FFFFFF" />
                Task list
            </Button>
        </section>
    );
};

export default EmptyState;
