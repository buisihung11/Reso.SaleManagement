import plusFill from '@iconify/icons-eva/plus-fill';
import Icon from '@iconify/react';
import { Box, Button, Card, Chip, DialogTitle, Stack } from '@material-ui/core';
import { useRequest } from 'ahooks';
import { DialogAnimate } from 'components/animate';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
import Label from 'components/Label';
import ResoTable from 'components/ResoTable/ResoTable';
import StoreInMenuForm from 'components/_dashboard/calendar/StoreInMenuForm';
import { DAY_OF_WEEK } from 'constraints';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack5';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import {
  addStoreApplyMenus,
  deleteStoreApplyMenus,
  getStoreApplyMenus,
  updateStoreApplyMenus
} from 'redux/menu/api';
import { TStoreApplyMenu } from 'types/menu';

const StoreApplyTab = () => {
  const { id }: any = useParams();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const { data: appliedStores, run }: { data: TStoreApplyMenu[] } & any = useRequest(
    () => getStoreApplyMenus(Number(id)),
    {
      formatResult: (res: any) => res.data.data
    }
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateStoreInMenu, setUpdateStoreInMenu] = useState<TStoreApplyMenu | null>(null);
  const [deleteStoreInMenu, setDeleteStoreInMenu] = useState<TStoreApplyMenu | null>(null);

  const handleSelect = (id: number) => {
    const sInMenuId = id;

    const storeInMenuIdx = appliedStores.findIndex(
      ({ menu_in_store_id: id }: { menu_in_store_id: number }) => id === Number(sInMenuId)
    );

    if (storeInMenuIdx !== -1) {
      setUpdateStoreInMenu(appliedStores[storeInMenuIdx]);
      setIsOpenModal(true);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setUpdateStoreInMenu(null);
  };

  const handleAddStoreApply = (values: any) => addStoreApplyMenus(+id, values).then(run);

  const handleUpdate = (values: TStoreApplyMenu) =>
    updateStoreApplyMenus(+id, values.store.id, values).then(run);

  const handleDelete = (data: TStoreApplyMenu) =>
    deleteStoreApplyMenus(+id, data?.store.id)
      .then(() => setDeleteStoreInMenu(null))
      .then(run)
      .then(() =>
        enqueueSnackbar(translate('common.deleteSuccess'), {
          variant: 'success'
        })
      );

  return (
    <Box>
      <DeleteConfirmDialog
        open={Boolean(deleteStoreInMenu)}
        onDelete={() => handleDelete(deleteStoreInMenu!)}
        onClose={() => setDeleteStoreInMenu(null)}
        title={translate('common.confirmDeleteTitle')}
      />
      <Card>
        <Box display="flex" justifyContent="space-between">
          <CardTitle>{translate('pages.menus.storeApplyTab.title')}</CardTitle>
          <Button
            onClick={() => {
              setIsOpenModal(true);
            }}
            size="small"
            startIcon={<Icon icon={plusFill} />}
          >
            {translate('pages.menus.storeApplyTab.addStoreInMenu')}
          </Button>
        </Box>
        <Box mt={2}>
          <DialogAnimate open={isOpenModal} onClose={handleClose}>
            <DialogTitle>
              {updateStoreInMenu
                ? translate('pages.menus.storeApplyTab.editStoreInMenu')
                : translate('pages.menus.storeApplyTab.addStoreInMenu')}
            </DialogTitle>

            <StoreInMenuForm
              storeInMenu={updateStoreInMenu}
              onCancel={handleClose}
              onUpdateEvent={handleUpdate}
              onAddStoreApply={handleAddStoreApply}
              onDelete={handleDelete}
            />
          </DialogAnimate>
          <ResoTable
            pagination={false}
            dataSource={appliedStores}
            columns={[
              {
                title: '#',
                dataIndex: 'index'
              },
              {
                title: translate('pages.menus.table.storeName'),
                dataIndex: 'store.store_name'
              },
              {
                title: translate('pages.menus.table.timeRange'),
                render: (_: any, { time_range }: TStoreApplyMenu) => (
                  <>
                    {translate('pages.menus.table.fromTime')}{' '}
                    <Label color="success">{time_range[0]}</Label>{' '}
                    {translate('pages.menus.table.toTime')}{' '}
                    <Label color="success">{time_range[1]}</Label>
                  </>
                )
              },
              {
                title: translate('pages.menus.table.dayFilter'),
                render: (_: any, { day_filters, menu_in_store_id: menu_id }: TStoreApplyMenu) => (
                  <Stack direction="row" spacing={1}>
                    {day_filters?.map((day) => (
                      <Chip
                        size="small"
                        key={`${menu_id}-${day}`}
                        label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
                      />
                    ))}
                  </Stack>
                )
              }
            ]}
            rowKey="menu_id"
            onEdit={(data: TStoreApplyMenu) => {
              handleSelect(data.menu_in_store_id!);
            }}
            onDelete={setDeleteStoreInMenu}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default StoreApplyTab;
