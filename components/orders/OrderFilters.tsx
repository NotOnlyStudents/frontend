import React from 'react';
import {
  Box,
} from '@material-ui/core';
import { OrderFilter, SortOrderType } from 'interfaces/orders/orders';
import TextFieldCustomerEmail from 'components/textfield/textfieldCustomerEmail';
import TextfieldStartDate from 'components/textfield/textfieldStartDate';
import TextfieldEndDate from 'components/textfield/textfieldEndDate';
import SortOrders from 'components/sort-products/SortOrders';

// import { OrderFilter, SortOrderType } from 'interfaces/orders/orders';
// import { NextRouter, useRouter } from 'next/router';
// import { useAuthContext } from 'lib/authContext';
// import { getOrderLink } from 'lib/links';
// import { SignedState } from 'interfaces/login';
// import TextfieldStartDate from 'components/textfield/textfieldStartDate';
// import TextfieldEndDate from 'components/textfield/textfieldEndDate';
// import SortOrders from 'components/sort-products/SortOrders';

// const useStyles = makeStyles((theme: Theme) => ({
//   container: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   link: {
//     display: 'flex',
//     alignItems: 'center',
//     color: 'white',
//     cursor: 'pointer',
//     '&:hover': {
//       textDecoration: 'none',
//     },
//     '&:focus': {
//       textDecoration: 'none',
//     },
//   },
//   searchContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     flexGrow: 1,
//     position: 'relative',
//   },
//   search: {
//     width: '80%',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//     width: '100%',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '100%',
//     },
//   },
// }));

interface Props {
  filter: OrderFilter;
  seller?: boolean;
  handleChangeFilter: (filter: OrderFilter) => void;
}

function OrderFilters({ filter, seller, handleChangeFilter }: Props) {
  // const router: NextRouter = useRouter();
  // const { signedState } = useAuthContext();
  // const [searchText, setSearchText] = useState(router.query.text || '');

  /* const handleSearchEnter = async (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      const newPage = {
        pathname: getOrderLink(signedState === SignedState.Seller),
        query: router.query,
      };

      if (searchText) {
        newPage.query.text = searchText;
      } else {
        delete newPage.query.text;
      }

      delete newPage.query.offset;

      await router.push(newPage);
      router.reload();
    }
  }; */

  const handleChangeStartDate = (start: Date) => {
    const filterStartDate: OrderFilter = { ...filter };
    filterStartDate.start = start.toISOString();
    handleChangeFilter(filterStartDate);
  };

  const handleChangeEndDate = (end: Date) => {
    const filterEndDate: OrderFilter = { ...filter };
    filterEndDate.end = end.toISOString();
    console.log(filterEndDate.end);
    handleChangeFilter(filterEndDate);
  };

  const handleChangeSort =  (sort: SortOrderType) => {
    const filterSort: OrderFilter = { ...filter };
    filterSort.sort = sort;
    handleChangeFilter(filterSort);
  };

  const handleChangeCustomerEmail = (customerEmail: string) => {
    const filterCustomer: OrderFilter = { ...filter };
    filterCustomer.email = customerEmail;
    handleChangeFilter(filterCustomer);
  };

  const renderSearchIfSeller = () => (seller
    ? (
      <TextFieldCustomerEmail
        customer={filter.email}
        handleChangeCustomer={handleChangeCustomerEmail}
      />
    )
    : <></>);

  return (
    <Box p={2}>
      <Box display="flex">
        { renderSearchIfSeller() }
      </Box>
      <Box display="flex">
        <TextfieldStartDate
          selectedStartDate={filter.start}
          selectedEndDate={filter.end}
          handleChangeStart={handleChangeStartDate}
        />
        <TextfieldEndDate
          selectedStartDate={filter.start}
          selectedEndDate={filter.end}
          handleChangeEnd={handleChangeEndDate}
        />
        <Box flexGrow={1} />
        <SortOrders
          sort={filter.sort}
          handleChangeSort={handleChangeSort}
        />
      </Box>
    </Box>
  );
}

export default OrderFilters;
