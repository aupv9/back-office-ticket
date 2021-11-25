import * as React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';
import {PeopleAlt} from "@material-ui/icons";


const CustomerCount = (props) => {
    const { value } = props;
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/users"
            icon={PeopleAlt}
            title={translate('pos.dashboard.customer_count')}
            subtitle={value}
        />
    );
};

export default CustomerCount;
