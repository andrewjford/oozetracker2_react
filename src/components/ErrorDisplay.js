import React from 'react';
import { Typography } from '@material-ui/core';

const ErrorDisplay = (props) => {
  const lines = props.errors.map((error) => {
    return (<Typography key={error} variant="body1" color="error">{error}</Typography>);
  });

  return (
    <div>
      {lines}
    </div>
  );
}

export default ErrorDisplay;