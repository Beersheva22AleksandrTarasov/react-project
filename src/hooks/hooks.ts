import { useDispatch } from "react-redux";
import CodePayload from "../model/CodePayload";
import CodeType from "../model/CodeType";
import { codeActions } from "../redux/slices/codeSlice";
import { useEffect, useState } from "react";
import Product from "../model/Product";
import Order from "../model/Order";
import { Subscription } from "rxjs";
import { productService, ordersService } from "../config/service-config";
import CartItem from "../model/CartItem";

export function useDispatchCode() {
    const dispatch = useDispatch();
    return (error: string, successMessage: string) => {
        let code: CodeType = CodeType.OK;
        let message: string = '';
        
        if (error.includes('Authentication')) {

            code = CodeType.AUTH_ERROR;
            message = "Authentication error, mooving to Sign In";
        } else {
            code = error.includes('unavailable') ? CodeType.SERVER_ERROR :
                CodeType.UNKNOWN;
            message = error;
        }
        dispatch(codeActions.set({ code, message: message || successMessage }))
    }
}
export function useSelectorEmployees() {
    const dispatch = useDispatchCode();
    const [employees, setEmployees] = useState<Product[]>([]);
    useEffect(() => {

        const subscription: Subscription = productService.getProducts()
            .subscribe({
                next(emplArray: Product[] | string) {
                    let errorMessage: string = '';
                    if (typeof emplArray === 'string') {
                        errorMessage = emplArray;
                    } else {
                        setEmployees(emplArray/*.map(e => e /*({ ...e, birthDate: new Date(e.birthDate) }))*/);
                    }
                    dispatch(errorMessage, '');

                }
            });
        return () => subscription.unsubscribe();
    }, []);
    return employees;
}
export function useSelectorCart() {
    const dispatch = useDispatchCode();
    const [cartProducts, setcartProducts] = useState<CartItem[]>([]);
    useEffect(() => {

        const subscription: Subscription = ordersService.getCartProducts()
            .subscribe({
                next(cartItems: CartItem[] | string) {
                    let errorMessage: string = '';
                    if (typeof cartItems === 'string') {
                        errorMessage = cartItems;
                    } else {
                        setcartProducts(cartItems/*.map(e => e /*({ ...e, birthDate: new Date(e.birthDate) }))*/);
                    }
                    dispatch(errorMessage, '');

                }
            });
        return () => subscription.unsubscribe();
    }, []);
    return cartProducts;
}
export function useSelectorOrders() {
    const dispatch = useDispatchCode();
    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => {

        const subscription: Subscription = ordersService.getOrders()
            .subscribe({
                next(orderArray: Order[] | string) {
                    let errorMessage: string = '';
                    if (typeof orderArray === 'string') {
                        errorMessage = orderArray;
                    } else {
                        setOrders(orderArray);
                    }
                    dispatch(errorMessage, '');

                }
            });
        return () => subscription.unsubscribe();
    }, []);
    return orders;
}
export function useSort(employeesFilter:Product[]) {
    const [res, setRes] = useState<Product[]>([]);
        useEffect(() => {
            
            setRes(employeesFilter.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                }
                if (a.price < b.price) {
                    return -1;
                }
                return 0;
            }))
        }, []);
        return res;
}
