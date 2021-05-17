import React from 'react';
import {
  Box,
} from '@material-ui/core';
import { OrderFilter } from 'interfaces/orders/orders';
import TextFieldCustomerEmail from 'components/textfield/textfieldCustomerEmail';
import TextFieldOrderID from 'components/textfield/textfieldOrderID';
import CheckboxStatus from 'components/checkboxes/checkboxStatus';

interface Props {
  filter: OrderFilter;
  seller?: boolean;
  disabled?: boolean;
  handleChangeFilter: (filter: OrderFilter) => void;
  handleChangeFilterId: (filter: OrderFilter) => void;
}

function OrderFilters({
  filter, seller, disabled, handleChangeFilter, handleChangeFilterId,
}: Props) {
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
    handleChangeFilter(filterEndDate);
  };

  const handleChangeCustomerEmail = (customerEmail: string) => {
    const filterCustomer: OrderFilter = { ...filter };
    filterCustomer.email = customerEmail;
    handleChangeFilter(filterCustomer);
  };

  const handleChangeOrderID = (id: string) => {
    const filterID: OrderFilter = { ...filter };
    filterID.id = id;
    handleChangeFilterId(filterID);
  };

  const handleChangeStatus = (fulfilled: boolean) => {
    const filterStatus: OrderFilter = { ...filter };
    filterStatus.status = fulfilled ? 'fulfilled' : 'new';
    handleChangeFilter(filterStatus);
  };

  const renderSearchIfSeller = (disabled) => (seller
    ? (
      <TextFieldCustomerEmail
        customer={filter.email}
        handleChangeCustomer={handleChangeCustomerEmail}
        disabled={disabled}
      />
    )
    : <></>);

  const renderCheckboxStatusIfSeller = (disabled) => (seller
    ? (
      <CheckboxStatus
        status={filter.status === 'fulfilled'}
        handleChangeStatus={handleChangeStatus}
        disabled={disabled}
      />
    )
    : <></>);

  return (
    <Box p={2}>
      <Box display="flex">
        { renderSearchIfSeller(disabled) }
      </Box>
      <Box display="flex">
        <TextFieldOrderID
          id={filter.id}
          handleChangeOrderId={handleChangeOrderID}
        />
      </Box>
      <Box display="flex">
        { renderCheckboxStatusIfSeller(disabled) }
        { /* <TextFieldStartDate
        /> */}
      </Box>
    </Box>
  );
}

export default OrderFilters;
