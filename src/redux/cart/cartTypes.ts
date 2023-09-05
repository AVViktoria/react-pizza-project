export type CartItemPropsType = {
  id: string;
  title: string;
  size: number;
  price: number;
  count: number;
  type: string;
  imageUrl: string;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItemPropsType[];
}