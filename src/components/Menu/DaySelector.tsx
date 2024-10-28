import React, { PropsWithChildren } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { enDays, getEnumKeyByValue } from "../constants/enum";
import { DaySelectorProps } from '../../types/types';

const DaySelector: React.FC<PropsWithChildren<DaySelectorProps>> = ({ selectedDay, setSelectedDay, children }) => {
  return (
    <ButtonGroup
      fullWidth
      variant="outlined"
      color="primary"
      sx={{
        borderRadius: '10px',
        overflow: 'hidden',
        '& .MuiButton-root': {
          flex: 1, 
          padding: '10px 20px',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#e0e0e0',
            color: '#1976d2',
          },
        },
        '& .MuiButton-contained': {
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#145ea8',
          },
        },
      }}
    >
      {Object.values(enDays)
        .filter((value) => typeof value === 'number')
        .map((day) => {
          return (
            <Button
              key={day}
              onClick={() => setSelectedDay(day as enDays)}
              variant={selectedDay === day ? 'contained' : 'outlined'}
            >
              {getEnumKeyByValue(enDays, day as number)}
            </Button>
          );
        })}
    </ButtonGroup>
  );
};

export default DaySelector;
