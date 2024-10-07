// Table Sections...
export const tableSections = [
  { id: 1, label: "Name" },
  { id: 2, label: "SKU Code" },
  { id: 3, label: "MRP" },
  { id: 4, label: "Price" },
  { id: 5, label: "Edit" },
  { id: 6, label: "Delete" },
];

// Initial Products...
export const initialProducts = [
  { id: 1, name: "Modern Sofa", skuCode: "SOF12345", mrp: 50000, price: 45000 },
  {
    id: 2,
    name: "Wooden Dining Table",
    skuCode: "DIN67890",
    mrp: 35000,
    price: 32000,
  },
  {
    id: 3,
    name: "Office Chair",
    skuCode: "CHA11223",
    mrp: 12000,
    price: 10500,
  },
  {
    id: 4,
    name: "Queen Size Bed",
    skuCode: "BED44556",
    mrp: 40000,
    price: 37500,
  },
  { id: 5, name: "Bookshelf", skuCode: "BKS77889", mrp: 18000, price: 16000 },
  {
    id: 6,
    name: "Recliner Chair",
    skuCode: "REC99001",
    mrp: 22000,
    price: 20000,
  },
  { id: 7, name: "Coffee Table", skuCode: "CFT22334", mrp: 9000, price: 8500 },
  { id: 8, name: "Wardrobe", skuCode: "WRD55678", mrp: 30000, price: 28000 },
  { id: 9, name: "Study Desk", skuCode: "STY33445", mrp: 15000, price: 13500 },
  { id: 10, name: "TV Stand", skuCode: "TVS99012", mrp: 12000, price: 11000 },
];

// Product Detail Type...
export type ProdDetail = {
  id?: string | number;
  name: string;
  skuCode: string;
  mrp: number;
  price: number;
};
