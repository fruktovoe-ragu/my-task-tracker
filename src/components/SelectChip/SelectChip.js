import React, { useState, useEffect, forwardRef } from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import CaretDownIcon from "../../icons/caret-down";
import CaretUpIcon from "../../icons/caret-up";
import * as Select from "@radix-ui/react-select";
import { statuses } from "../../App";
import './SelectChip.css';

const cn = cnCreate('select-chip');
const SelectChip = ({
    status = statuses[0].value,
}) => {
    const [currentStatus, setCurrentStatus] = useState(status); 

    const handleValueChange = value => {
        setCurrentStatus(value);
    }

    const SelectItem = forwardRef(
        ({ children, className, ...props }, forwardedRef) => {
            return (
                <Select.Item
                    className={cn('item-container', className)}
                    {...props}
                    ref={forwardedRef}
                >
                    <Select.ItemText>{children}</Select.ItemText>
                </Select.Item>
            );
        },
    );

    return (
        <div className={cn('')}>
            <Select.Root defaultValue={currentStatus} onValueChange={handleValueChange}>
                <Select.Trigger className={cn('trigger', { theme: currentStatus })} aria-label="task status">
                    <Select.Value placeholder="Status" />
                    <Select.Icon className={cn('icon')}>
                        <CaretDownIcon />
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content className={cn('content')}>
                        <Select.Viewport className={cn('viewport')}>
                            <Select.Group>
                                <SelectItem className={cn('item', {theme: statuses[0].value})} value={statuses[0].value}>{statuses[0].content}</SelectItem>
                                <SelectItem className={cn('item', {theme: statuses[1].value})} value={statuses[1].value}>{statuses[1].content}</SelectItem>
                                <SelectItem className={cn('item', {theme: statuses[2].value})} value={statuses[2].value}>{statuses[2].content}</SelectItem>
                            </Select.Group>
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    );
};

export default SelectChip;