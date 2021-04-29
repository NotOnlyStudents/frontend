import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import React from 'react';

interface Props {
  price: number,
  discount: number,
  quantity?: number
}

const useStyles = makeStyles({
  root: {
    '& > *': {
      marginRight: '1em',
    },
  },
  price: {
    textDecoration: 'line-through',
  },
  discount: {
    color: green[500],
  },
});

function PriceItem({ price, quantity, discount } : Props) {
  const classes = useStyles();

  const calculateDiscount = (Math.round((price - (price * discount) / (100)) * 100) / 100).toFixed(2);

  return (
    <Box display="flex" className={classes.root}>
      <Typography className={discount ? classes.price : ''}>
        {price * quantity}
        €
      </Typography>
      {
        discount
          ? (
            <>
              <Typography className={classes.discount}>
                { calculateDiscount }
                €
              </Typography>
              <Typography className={classes.discount}>
                {discount}
                %
              </Typography>
            </>
          ) : <></>
      }
    </Box>
  );
}

PriceItem.defaultProps = {
  quantity: 1,
};

export default PriceItem;
