import React from 'react';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import { useSelector, useDispatch } from 'react-redux';
import { createNewList } from '../../store/dataUpdating';
import ProTrackerIcon from "../../icons/pro-tracker";
import FilterIcon from "../../icons/filter";
import PlusIcon from "../../icons/plus";
import Button from "../../components/Button/Button";
import Chip from "../../components/FilterChip/FilterChip";
import { statuses } from "../../App";
import './Header.css';

const b = block('header');
const Header = () => {
  const { isMobile } = useAppContext();
  const { taskLists } = useSelector(state => state.listDataUpdating);
  const dispatch = useDispatch();

  const isLegentShown = !isMobile && !!taskLists.length && taskLists.find(({ tasksList }) => !!tasksList.length);

  const handleCreateListClick = () => {
    dispatch(createNewList());
  };

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
              onClick={handleCreateListClick}
              className={b('button')}
              theme='primary'
            >
              <PlusIcon fill="#FFFFFF" />
              Task list
            </Button>
          }
        </section>
        {isLegentShown &&
          <section className={b('legend-container')}>
            <p className={b('status')}>Status</p>
            <p className={b('description')}>Task description</p>
            <p className={b('date')}>Date</p>
            <p className={b('actions')}>Options</p>
          </section>
        }
      </header>
  );
}

export default Header;
