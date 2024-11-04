import React from 'react';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import ProTrackerIcon from "../../icons/pro-tracker";
import FilterIcon from "../../icons/filter";
import PlusIcon from "../../icons/plus";
import Button from "../../components/Button/Button";
import Chip from "../../components/FilterChip/FilterChip";
import { statuses } from "../../App";
import './Header.css';

const b = block('header');
const Header = ({ onCreateTaskList, onFilterChipClick, chosenStatus }) => {
  const { isMobile } = useAppContext();
  
  return (
      <header className={b()}>
        <section className={b('title-container')}>
          <ProTrackerIcon />
          <h1 className={b('title')}>The ultimate task-tracker Pro 3000</h1>
        </section>
        <section className={b('application-bar')}>
          <div className={b('filter-container')}>
            <FilterIcon />
            <div className={b('filters')} role="group" aria-label="Filter options">
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
          {!isMobile &&
            <Button
              onClick={onCreateTaskList}
              className={b('button')}
              theme='primary'
            >
              <PlusIcon fill="#FFFFFF" />
              Task list
            </Button>
          }
        </section>
        {!isMobile &&
          <section className={b('legend-container')}>
            <p scope="col" className={b('status')}>Status</p>
            <p scope="col" className={b('description')}>Task description</p>
            <p scope="col" className={b('date')}>Date</p>
            <p scope="col" className={b('actions')}>Edit</p>
          </section>
        }
      </header>
  );
}

export default Header;