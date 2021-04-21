// import { OrdeItem } from 'interfaces/products/product';
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import { useHistory } from 'react-router-dom';
// import {
//     Box, Button, CardActions, IconButton, Link,
// } from '@material-ui/core'; 

// interface Props {
//     item: OrderItem[]
// }

// const useStyles = makeStyles({
//     root: {
//         width: '100%',
//     },
//     image: {
//         height: 100,
//     },
// });

// function OrderItem({ item }: Props) {
//     const classes = useStyles();
//     const history = useHistory();
//     return (
//         <List className={classes.root}>
//             {item.map((item: OrderProduct): React.ReactElement => (
//                 <Box position="relative" display="block">
//                     <ListItem  
//                         button 
//                         key={item.id}
//                         onClick={() => history.push(`/pdp/${item.id}`)}
//                         >        
//                         <ListItemIcon className= {classes.image}>
//                             {item.image}
//                         </ListItemIcon>
//                         <ListItemText primary={item.name}/>
//                         <p>Quantità: {item.quantity}</p>
//                         <Box alignItems="right" textAlign="center">
//                             <p>Prezzo:</p>
//                             {item.price}
//                         </Box>
//                     </ListItem>
//                 </Box>
//             ))}
//         </List>
//     );
// }

// export default OrderItem;