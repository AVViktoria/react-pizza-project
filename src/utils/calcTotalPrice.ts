import { CartItemPropsType } from '../redux/cart/cartTypes';

export const calcTotalPrice = ( items: CartItemPropsType[]) => {
 return items.reduce((sum, obj) =>  obj.price * obj.count + sum, 0);
}