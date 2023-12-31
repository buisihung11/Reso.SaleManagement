export type Store = {
  id: number;
  name: string;
  short_name: string;
  is_available: boolean;
  create_date: Date;
  type: number;
  open_time: Date;
  close_time: Date;
  store_code?: string;
};

export type StoreInMenu = {
  menu_in_store_id: number;
  menu_id?: number;
  menu_name?: string | null;
  time_range: string[];
  dayFilters: number[];
  store: {
    id: number;
    store_name: string;
  };
};
