import React, { useState, useEffect, useRef } from 'react';
import { block } from 'bem-cn';
import Button from "../Button/Button";
import DeleteIcon from "../../icons/delete";
import EditIcon from "../../icons/edit";
import MenuIcon from "../../icons/menu";
import './Menu.css';

const b = block('menu');
const Menu = ({
    position = 'top-right',
    className = '',
    onEditClick,
    onDeleteClick,
    onMenuClick,
}) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const dropdownRef = useRef(null);

    const handleClickOutside = e => {
        if (!dropdownRef.current.contains(e.target)) {
            setIsMenuOpened(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });

    const handleMenuClick = () => {
        const newState = !isMenuOpened;

        setIsMenuOpened(newState);

        onMenuClick?.(newState);
    };

    const handleEditClick = e => {
        e.stopPropagation();

        setIsMenuOpened(false);

        onEditClick?.(e);
    };

    const handleDeleteClick = e => {
        e.stopPropagation();

        setIsMenuOpened(false);

        onDeleteClick?.(e);
    };

    return (
        <div
            className={b({}).mix(className)}
            ref={dropdownRef}
        >
            <div className={b('trigger')}>
                <Button onClick={handleMenuClick}>
                    <MenuIcon />
                </Button>
            </div>
            {isMenuOpened &&
                <div className={b('dropdown-list', { position })}>
                    <div
                        className={b('item')}
                        onClick={handleEditClick}
                    >
                        <EditIcon />
                        <p className={b('text')}>Edit</p>
                    </div>
                    <div
                        className={b('item')}
                        onClick={handleDeleteClick}
                    >
                        <DeleteIcon fill="#CA3737" />
                        <p className={b('text', { warning: true })}>Delete</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default Menu;
