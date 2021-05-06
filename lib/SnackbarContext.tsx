import SnackbarAddressNotValid, { addressNotValidId } from 'components/snackbar/address/SnackbarAddressNotValid';
import SnackbarAddToCartError, { addToCartErrorId } from 'components/snackbar/cart/SnackbarAddToCartError';
import SnackbarAddToCartSuccess, { addToCartSuccessId } from 'components/snackbar/cart/SnackbarAddToCartSuccess';
import SnackbarRemoveFromCartError, { removedFromCartErrorId } from 'components/snackbar/cart/SnackbarRemoveFromCartError';
import SnackbarRemoveFromCartSuccess, { removedFromCartSuccessId } from 'components/snackbar/cart/SnackbarRemoveFromCartSuccess';
import SnackbarChangeQuantityError, { changeQuantityErrorId } from 'components/snackbar/quantity/SnackbarChangeQuantityError';
import SnackbarChangeQuantitySuccess, { changeQuantitySuccessId } from 'components/snackbar/quantity/SnackbarChangeQuantitySuccess';
import React, { createContext, useContext } from 'react';

interface SnackbarContextProps {
  openSnackbar: (id: string) => void
}

export const SnackbarContext = createContext<Partial<SnackbarContextProps>>({});

export const Snackbars = {
  addToCartSuccessId,
  addToCartErrorId,
  removedFromCartSuccessId,
  removedFromCartErrorId,
  changeQuantitySuccessId,
  changeQuantityErrorId,
  addressNotValidId,
};

interface Props {
  children: React.ReactElement;
}

function SnackbarContextProvider({ children }: Props) {
  const alertObj = Object.values(Snackbars)
    .map((snackbar) => ({ [snackbar]: false }))
    .reduce((obj, currentObj) => ({ ...currentObj, ...obj }), {});

  const [alert, setAlert] = React.useState(alertObj);

  const changeAlert = (id: string, show: boolean) => {
    const newAlert = { ...alert };

    newAlert[id] = show;

    setAlert(newAlert);
  };

  const openSnackbar = (id: string) => {
    changeAlert(id, true);
  };

  const closeSnackbar = (id: string) => {
    changeAlert(id, false);
  };

  return (
    <SnackbarContext.Provider value={{
      openSnackbar,
    }}
    >
      {children}

      <SnackbarAddToCartSuccess
        open={alert[addToCartSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarAddToCartError
        open={alert[addToCartErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarRemoveFromCartSuccess
        open={alert[removedFromCartSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarRemoveFromCartError
        open={alert[removedFromCartErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarChangeQuantitySuccess
        open={alert[changeQuantitySuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarChangeQuantityError
        open={alert[changeQuantityErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarAddressNotValid
        open={alert[addressNotValidId]}
        handleClose={closeSnackbar}
      />
    </SnackbarContext.Provider>
  );
}

export function useSnackbarContext() {
  return useContext(SnackbarContext);
}

export default SnackbarContextProvider;
