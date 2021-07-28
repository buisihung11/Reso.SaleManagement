export const PRODUCT_MASTER = 6;
export const PRODUCT_EXTRA = 5;
export const PRODUCT_DETAIL = 7;
export const PRODUCT_SINGLE = 0;
export const PRODUCT_COMBO = 1;
export const PRODUCT_COMPLEX = 10;

export const PRODUCT_TYPE_DATA = [
  {
    value: PRODUCT_MASTER,
    typeCode: 'master',
    label: 'Dòng sản phẩm'
  },
  {
    value: PRODUCT_COMPLEX,
    typeCode: 'complex',
    label: 'SP Kết hợp'
  },
  {
    value: PRODUCT_COMBO,
    typeCode: 'combo',
    label: 'SP Combo'
  },
  {
    value: PRODUCT_SINGLE,
    typeCode: 'single',
    label: 'SP Đơn'
  },
  {
    value: PRODUCT_EXTRA,
    typeCode: 'extra',
    label: 'SP Extra'
  }
];