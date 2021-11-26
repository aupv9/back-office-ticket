import * as React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';


const PendingOrders = (props) => {
    const { value } = props;
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/my-orders"
            icon={ShoppingCartIcon}
            title={translate('pos.dashboard.pending_orders')}
            subtitle={value}
        />
    );
};

export default PendingOrders;
