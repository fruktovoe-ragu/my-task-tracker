import React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import ProTrackerIcon from "../../icons/pro-tracker";
import FilterIcon from "../../icons/filter";
import PlusIcon from "../../icons/plus";
import Button from "../../components/Button/Button";
import Chip from "../../components/FilterChip/FilterChip";
import { statuses } from "../../App";
import './Header.css';

const cn = cnCreate('header');
const Header = ({ onCreateTaskList, onFilterChipClick, chosenStatus }) => {
  return (
      <header className={cn('')}>
        <section className={cn('title-container')}>
          <ProTrackerIcon />
          <h1 className={cn('title')}>The ultimate task-tracker Pro 3000</h1>
        </section>
        <section className={cn('application-bar')}>
          <div className={cn('filter-container')}>
            <FilterIcon />
            <div className={cn('filters')} role="group" aria-label="Filter options">
              {statuses.map(({ value, content }) => (
                <Chip
                  onClick={onFilterChipClick}
                  chosenStatus={chosenStatus}
                  value={value}
                  key={value}
                >
                  {content}
                </Chip>  
              ))}
            </div>
          </div>
          <Button
            onClick={onCreateTaskList}
            theme='primary'
          >
            <PlusIcon fill="#FFFFFF" />
            Task list
          </Button>
        </section>
        <section className={cn('legend-container')}>
          <p scope="col" className={cn('status')}>Status</p>
          <p scope="col" className={cn('description')}>Task description</p>
          <p scope="col" className={cn('date')}>Date</p>
          <p scope="col" className={cn('actions')}>Actions</p>
        </section>
      </header>
  );
}

export default Header;