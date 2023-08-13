import {useDispatch} from 'react-redux';
import { authActions } from '../../redux/slices/authSlice'
import { Button } from '@mui/material';
import CartItem from '../../model/CartItem';
import { useSelectorCart, useSelectorProducts } from '../../hooks/hooks';
import { ordersService } from '../../config/service-config';
const SignOut: React.FC = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelectorCart();
    const products = useSelectorProducts();
   
    const cartContent: CartItem[] = cartProducts.map(e => {
        const product = products.find(el => el.id == e.id);
        return {...e, 
            category: product?.category,
            name: product?.name,
            description: product?.description,
            unit:product?.unit,
            imageLink:product?.imageLink,
            price: product?.price,                
            sum: ((products.find(el => el.id == e.id)?.price)||0) * (e.quantity||0)}
    });
    return <Button onClick={() => {dispatch(authActions.reset());
                               
                             }}>confirm sign out</Button>
}
 
 export default SignOut;