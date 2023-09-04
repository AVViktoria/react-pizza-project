import { CartItemPropsType } from '../redux/slices/cart/cartTypes';

export const calcTotalPrice = ( items: CartItemPropsType[]) => {
 return items.reduce((sum, obj) =>  obj.price * obj.count + sum, 0);
}