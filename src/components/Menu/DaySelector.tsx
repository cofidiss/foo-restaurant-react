import React, { PropsWithChildren } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import {enDays, getEnumKeyByValue} from "../constants/enum"
import { DaySelectorProps } from '../../types/types';

const DaySelector: React.FC<PropsWithChildren<DaySelectorProps>> = ({ selectedDay, setSelectedDay,children }) => {
  return (
    <ButtonGroup fullWidth variant="outlined" color="primary">
      {Object.values(enDays).filter(value => typeof value === "number").map(day =>  {return (
        <Button 
          key={day} 
          onClick={() => setSelectedDay(day as enDays)} 
          variant={selectedDay === day ? 'contained' : 'outlined'}        >
          {getEnumKeyByValue(enDays,day as number)}
        </Button>

      )})}
    </ButtonGroup>
  );
};

export default DaySelector;
