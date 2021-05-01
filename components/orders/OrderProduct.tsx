import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Order } from 'interfaces/orders/orders';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Button, CardActions, IconButton, Link, CardActionArea, Grid, ButtonBase, Paper,
} from '@material-ui/core';
import { PLPProductItem } from 'interfaces/products/product';
// import { OrderItem } from 'interfaces/products/product';

interface Props {
  order: Order
}
// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
//   image: {
//     height: '8em',
//     width: 200,
//   },
//   price: {
//     textAlign: 'center',
//     position: 'relative',
//     right: 0,
//   },
// });
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    // flexWrap: 'wrap',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  header: {
    justify: 'space-between',
    border: 1,
    padding: 1,
  },
}));

// TODO Colore in base allo stato dell'ordine
function OrderProduct({ order }: Props) {
  const classes = useStyles();

  const calculateTotalPrice = (): number => (
    order.products.map((item: PLPProductItem) => (item.quantity * item.price))
      .reduce(
        (totalPrice, price): number => (
          totalPrice + price
        ),
        0,
      )
  );

  const renderAddress = (): string => `${order.address.address}`;

  const renderAllOrderItems = (): React.ReactElement[] => order.products.map(
    (item: PLPProductItem): React.ReactElement => (
      <Grid container spacing={2}>
        <Grid item>
          <CardMedia
            className={classes.image}
            image={item.image}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {item.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Button
                  href={`/pdp/${item.id}`}
                  component={Link}
                  size="small"
                  color="primary"
                >
                  See more details
                </Button>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Quantità: {item.quantity}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1"> {item.price}€  </Typography>
          </Grid>
        </Grid>
      </Grid>
    ),
  );

  return (
    <Box>
    <Grid container spacing={2} className={classes.container}>
      <Grid xl={1} container className={classes.header}>
        <Grid item>
          <Typography>
            { order.date } - { renderAddress() }
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            1
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            { order.status }
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            { `${ calculateTotalPrice() }€` }
          </Typography>
        </Grid>
      </Grid>
    </Grid>
      <Box flex-wrap="wrap">
        {renderAllOrderItems()}
      </Box>
      </Box>
  );
}

export default OrderProduct;


    //   <Box
    //   width="100%"
    //   height="10em"
    //   borderBottom={1}
    //   borderColor="primary"
    //   marginBottom={3}
    // >
    //   <Grid
    //     container spacing={2}
    //     //direction="row"
    //     //justify="center"
    //     //alignItems="center"
    //   >
    //     <Grid item>
    //       <CardMedia
    //         className={classes.image}
    //         image={item.image}
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm container>
    //       <Grid item xs container direction="column" spacing={2}>
    //         <Grid item xs>
    //           <Typography variant="h6">
    //             { item.name }
    //           </Typography>
    //           <Typography>
    //           <Button
    //             href={`/pdp/${item.id}`}
    //             component={Link}
    //             size="small"
    //             color="primary"
    //           >
    //             See more details
    //           </Button>
    //           </Typography>
    //           <Typography variant="h6" component="div">
    //             Quantità: { item.quantity }
    //           </Typography>
    //         </Grid>
    //       </Grid>
    //       <Grid item>
    //         <Typography variant="body2">
    //           Prezzo:
    //         </Typography>
    //         <Typography>
    //           { item.price }
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Box>
    


    //   <Box display="flex">
    //     <CardMedia
    //       className={classes.image}
    //       image={item.image}
    //     />
    //     <Box
    //       display="flex"
    //       flexGrow="1"
    //       paddingLeft={3}
    //       paddingRight={3}
    //       flexDirection="column"
    //     >
    //       <Typography variant="h6">
    //         { item.name }
    //       </Typography>
    //       <Typography>
    //       <Button
    //           href={`/pdp/${item.id}`}
    //           component={Link}
    //           size="small"
    //           color="primary"
    //         >
    //           See more details
    //         </Button>
    //       </Typography>
    //       <Typography variant="h6" component="div">
    //         Quantità: { item.quantity }
    //       </Typography>
    //       <Box flexGrow={1} />
    //     </Box>
    //     <Box
    //       display="flex"
    //       alignItems="center"
    //       justifyContent="center"
    //       flexDirection="column"
    //       width="15em"
    //       borderLeft={1}
    //       borderRight={1}
    //       borderColor="primary"
    //     >
    //       <Typography variant="body2">
    //         Prezzo:
    //       </Typography>
    //       <Typography>
    //         { item.price }
    //       </Typography>
    //     </Box>
    //   </Box>
    // </Box>