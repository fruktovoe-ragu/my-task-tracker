import React, { useState, forwardRef } from 'react';
import { block } from 'bem-cn';
import CaretDownIcon from "../../icons/caret-down";
import * as Select from "@radix-ui/react-select";
import { statuses } from "../../App";
import './SelectChip.css';

const b = block('select-chip');
const SelectChip = ({
    status = statuses[0].value,
    disabled = false,
    onValueChange,
}) => {
    const [currentStatus, setCurrentStatus] = useState(status); 

    const handleValueChange = value => {
        setCurrentStatus(value);

        onValueChange?.(value);
    };

    const SelectItem = forwardRef(
        ({ children, className, ...props }, forwardedRef) => {
            return (
                <Select.Item
                    className={b('item-container').mix(className)}
                    {...props}
                    ref={forwardedRef}
                >
                    <Select.ItemText>{children}</Select.ItemText>
                </Select.Item>
            );
        },
    );

    return (
        <div className={b({ disabled })}>
            <Select.Root defaultValue={currentStatus} disabled={disabled} onValueChange={handleValueChange}>
                <Select.Trigger className={b('trigger', { theme: currentStatus })} aria-label="task status">
                    <Select.Value placeholder="Status" />
                    {!disabled &&
                        <Select.Icon className={b('icon')}>
                            <CaretDownIcon />
                        </Select.Icon>
                    }
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content className={b('content')}>
                        <Select.Viewport className={b('viewport')}>
                            <Select.Group>
                                <SelectItem className={b('item', {theme: statuses[0].value})} value={statuses[0].value}>{statuses[0].content}</SelectItem>
                                <SelectItem className={b('item', {theme: statuses[1].value})} value={statuses[1].value}>{statuses[1].content}</SelectItem>
                                <SelectItem className={b('item', {theme: statuses[2].value})} value={statuses[2].value}>{statuses[2].content}</SelectItem>
                            </Select.Group>
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    );
};

export default SelectChip;