import { Box, Button, Drawer, IconButton, Paper, Stack, Typography } from '@material-ui/core';
import React from 'react';
import Icon from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { Card } from 'pages/Products/components/Card';
import SeachProductForm from 'pages/Products/SeachProductForm';
import { productColumns } from 'pages/Products/config';
import { getAllProduct } from 'redux/product/api';
import ResoTable from '../ResoTable/ResoTable';
import LoadingAsyncButton from '../LoadingAsyncButton/LoadingAsyncButton';

const DrawerProductForm = ({ trigger, children, onSubmit }) => {
  const [open, setOpen] = React.useState(false);
  const [filters, setFilters] = React.useState(null);

  const [selectedProductIds, setSelectedProductIds] = React.useState([]);
  const [selectedProducts, setSelectedProduct] = React.useState([]);

  const handleClick = () => {
    setOpen((o) => !o);
  };

  const handleSubmit = () =>
    Promise.resolve(onSubmit && onSubmit(selectedProductIds, selectedProducts)).then(() =>
      setOpen(false)
    );

  const handleChangeSelection = React.useCallback((ids, data) => {
    setSelectedProductIds(ids);
    setSelectedProduct(data);
  }, []);

  return (
    <>
      {React.cloneElement(trigger, { onClick: handleClick })}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box display="flex" flexDirection="column" height="100vh" maxHeight="100vh">
          <Paper>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              borderBottom={1}
              borderColor="grey.300"
              textAlign="right"
            >
              <Typography variant="h6">Thêm sản phẩm vào thực đơn</Typography>
              <IconButton aria-label="close" onClick={() => setOpen(false)}>
                <Icon icon={closeFill} />
              </IconButton>
            </Box>
          </Paper>
          <Box sx={{ padding: '1em', width: '740px', flex: 1, overflowY: 'auto' }}>
            <Stack spacing={2}>
              <SeachProductForm onChange={setFilters} />

              <ResoTable
                checkboxSelection={{
                  type: 'checkbox'
                }}
                showAction={false}
                scroll={{ y: '100%' }}
                rowKey="product_id"
                getData={getAllProduct}
                onChangeSelection={handleChangeSelection}
                filters={filters}
                columns={productColumns}
              />
            </Stack>
          </Box>
          <Box
            p={2}
            borderTop={1}
            borderColor="grey.300"
            component={Paper}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">
              Đã chọn <strong>{selectedProductIds.length}</strong> sản phẩm
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <LoadingAsyncButton onClick={handleSubmit} variant="contained">
                Thêm
              </LoadingAsyncButton>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerProductForm;
