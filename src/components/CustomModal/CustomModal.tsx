import React, { PropsWithChildren } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { CustomModalProps } from '../../types/types';



const CustomModal: React.FC<PropsWithChildren< CustomModalProps>> = ({
  isOpen,
  title,
  message,
  okButtonText,
  okButtonClick,
  leftButtonText,
  leftButtonClick,
  rightButtonText,
  rightButtonClick,
  children

}) => {
    // Validation check
    if (okButtonText && (leftButtonText || rightButtonText)) {
      throw new Error("If 'okButtonText' is provided, 'leftButtonText' and 'rightButtonText' must not be defined.");
    }
  return (
    <Dialog open={isOpen} >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {children}
        {message && <Typography>{message}</Typography>}
      </DialogContent>
      <DialogActions>
        {leftButtonText && (
          <Button onClick={leftButtonClick} color="primary">
            {leftButtonText}
          </Button>
        )}
        {okButtonText && (
          <Button onClick={okButtonClick} color="primary">
            {okButtonText}
          </Button>
        )}
        {rightButtonText && (
          <Button onClick={rightButtonClick} color="primary">
            {rightButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
