import * as React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';


const OrdersPayment = (props) => {
    const { value } = props;
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/my-orders"
            icon={ShoppingCartIcon}
            title={translate('pos.dashboard.orders_payment')}
            subtitle={value}
        />
    );
};

export default OrdersPayment;
