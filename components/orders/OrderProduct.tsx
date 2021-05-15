import React, { ReactElement } from 'react';
import { Order, OrderStatus } from 'interfaces/orders/orders';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogActions, DialogTitle, IconButton, Button, Grid, CardMedia, Typography, Link,
} from '@material-ui/core';
import { PLPProductItem } from 'interfaces/products/product';
import { getViewProductLink } from 'lib/links';
import { useRouter } from 'next/router';
import OrderService from 'services/order-service';
import { Auth } from 'aws-amplify';

interface Props {
  order: Order,
  seller?: boolean
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  image: {
    height: 128,
    width: 128,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  price: {
    alignSelf: 'center',
    paddingLeft: 10,
    // borderBottom: 'solid 1px black',
    // borderRight: 'solid 1px black',
  },
  header: {
    justify: 'space-between',
    border: 1,
    paddingLeft: 1,
  },
  description: {
    paddingLeft: 1,
    flexDirection: 'column',
    // borderRight: 'solid 1px black',
  },
  product: {
    // borderBottom: 'solid 1px black',
  },
  text: {
    fontWeight: 500,
  },
  textHeader: {
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
});

function OrderProduct({ order, seller }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const renderAddress = (): string => `${order.address.address}`;



  const changeStatus = async (): Promise<void>=> {
    let token: string;
    try {
      const { signInUserSession } = await Auth.currentAuthenticatedUser();
      token = signInUserSession.idToken.jwtToken;
      try{
        await (new OrderService()).editOrder(token,order.id);
        setOpenModal(false);
        renderAllOrderItems();
      }
      catch{console.log("erroe");}
      //console.log("Moidfy the order with success");
    }
    catch(error){
      console.error(error);
      setOpenModal(false);
    }
    return;
  }


  const renderStatus = (): string | ReactElement => {
    if(seller)
    {
      if(order.status===OrderStatus.new)
      {
        return(<>
          {order.status}
          <Button
          onClick={() => { setOpenModal(true); }}
          size="small"
          color="secondary">
          Set Fullfilled
          </Button>
          </>);
      }
    }
      return order.status;
  }


  const calculateTotalPrice = (): number => (
    order.products.map((item: PLPProductItem) => (item.quantity * item.price))
      .reduce(
        (totalPrice, price): number => (
          totalPrice + price
        ),
        0,
      )
  );

  

  const renderAllOrderItems = (): React.ReactElement[] => order.products.map(
    (item: PLPProductItem, index:number): React.ReactElement => (
      <Grid key={index} item container>
        <CardMedia
          className={classes.image}
          image={item['images'][0]}
        />
        <Grid item xs={12} sm container className={classes.product}>
          <Grid item xs container className={classes.description}>
            <Grid item>
              <Typography variant="subtitle1" className={classes.text}>
                {item.name}
              </Typography>
              <Typography variant="body2">
                <Button
                  onClick={() => { router.push(getViewProductLink(item.id, seller)); }}
                  component={Link}
                  size="small"
                  color="primary"
                >
                  See more details
                </Button>
                <Dialog
                    open={openModal}
                    aria-labelledby="alert-dialog-title"
                >
                <DialogTitle id="alert-dialog-title">Are you sure to set this order fullfilled?</DialogTitle>
                  <DialogActions>
                    <Button onClick={() => {setOpenModal(false); }} color="primary">
                      NO
                    </Button>
                    <Button onClick={() => {changeStatus()}} color="primary" autoFocus>
                        YES
                    </Button>
                  </DialogActions>
                </Dialog>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Quantity:
                {' '}
                {item.quantity}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Unit price:
                {' '}
                {item.price}
                €
                {' '}
              </Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.price}>
            <Typography variant="subtitle1">
              Price:
              {' '}
              {item.price * item.quantity}
              €
              {' '}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    ),
  );

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        className={classes.header}
        container
      >
        <Grid item container justify="space-between">
          <Grid item>
            <Typography>
              <span className={classes.textHeader}>Date:</span>
              {' '}
              { order.date.substring(0, 10) }
              {' '}
              -
              {' '}
              <span className={classes.textHeader}>Address:</span>
              {' '}
              { renderAddress() }
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <span className={classes.textHeader}>Order Id:</span>
              {' '}
              { order.id }
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justify="space-between">
          <Grid item>
            <Typography>
              <span className={classes.textHeader}>Status:</span>
              {' '}
              { renderStatus() }
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <span className={classes.textHeader}>Order price:</span>
              {' '}
              { calculateTotalPrice() }
              €
              {' '}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container>
        {renderAllOrderItems()}
      </Grid>
    </Grid>
  );
}

export default OrderProduct;
