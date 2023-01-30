import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useGlobalContext } from '../../hooks/useGlobalContext';
import { Typography } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PopUpVariable() {
  const { openPopUp, setOpenPopUp } = useGlobalContext();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenPopUp({ error: '', success: '' });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openPopUp.error}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          <Typography
            sx={{
              fontSize: 18,
            }}
          >
            {openPopUp.error}
          </Typography>
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openPopUp.success}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          <Typography
            sx={{
              fontSize: 18,
            }}
          >
            {openPopUp.success}
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
}
