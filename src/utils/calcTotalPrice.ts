import { CartItemPropsType } from '../components/CartItem';

export const calcTotalPrice = ( items: CartItemPropsType[]) => {
 return items.reduce((sum, obj) =>  obj.price * obj.count + sum, 0);
}