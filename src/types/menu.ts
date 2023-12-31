export type Menu = {
  menu_id: number;
  store_id: number;
  time_from?: any;
  time_to?: any;
  day_filter?: any;
  active?: any;
  menu_name?: any;
  store_name: string;
  day_filters: number[];
  time_from_to: string[];
};

export type TStoreApplyMenu = {
  menu_in_store_id?: number;
  store: { id: number; store_name?: string };
  time_range: string[];
  day_filters: number[];
};
export type TStoreApplyMenuRequest = {
  menu_in_store_id?: number;
  store_id: number;
  time_range: string[];
  day_filters: number[];
};
