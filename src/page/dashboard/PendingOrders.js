import * as React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';


const PendingOrders = (props) => {
    const { value } = props;
    const translate = useTranslate();
    console.log(value)
    return (
        <CardWithIcon
            to="/orders"
            icon={ShoppingCartIcon}
            title={translate('pos.dashboard.pending_orders')}
            subtitle={value}
        />
    );
};

export default PendingOrders;
