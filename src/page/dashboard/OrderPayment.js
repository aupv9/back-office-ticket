import * as React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';


const OrdersPayment = (props) => {
    const { value,role } = props;
    const translate = useTranslate();
    return (
        <CardWithIcon
            to={role === 2 ? "my-orders" : role === 3 ? "orders" :"orders"}
            icon={ShoppingCartIcon}
            title={translate('pos.dashboard.orders_payment')}
            subtitle={value}
        />
    );
};

export default OrdersPayment;
