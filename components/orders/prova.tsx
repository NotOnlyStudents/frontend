const renderAllOrderItems = (): React.ReactElement[] => order.products.map(
    (item: PLPProductItem): React.ReactElement => (
      <Box position="relative" display="block">
        <CardMedia
          className={classes.image}
          image={item.image}
        />
        <CardContent>
          <Typography>
            { item.name }
          </Typography>
          <Button component={Link} size="small" color="primary" href={`/pdp/${item.id}`}>
            Vai alla pagina del prodotto
          </Button>
          <p>Quantità: </p>
          { item.quantity }
          <Box position="relative" display="flex" flexDirection="row" right={0}>
            <p> Prezzo </p>
            <Typography>
              { item.price }
            </Typography>
          </Box>
        </CardContent>
      </Box>
    ),
  );
  
<Card className={classes.root}>
<Box position="relative" display="block">
  <Box display="flex" justifyContent="space-between" width="100%">
    <Typography>
      <p>Data</p>
      { renderAddress() }
    </Typography>
    <Typography>
      { order.id }
    </Typography>
    <Typography>
      { order.status }
    </Typography>
    {/* <Typography variant="h5" component="h2" noWrap>
                  { order.price }
              </Typography> */}
  </Box>
  {renderAllOrderItems()}
</Box>
</Card>