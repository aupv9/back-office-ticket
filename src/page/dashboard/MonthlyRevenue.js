import * as React from 'react';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

import SockJsClient from 'react-stomp';
import {useEffect, useState} from "react";
import * as SockJS from 'sockjs-client';

const MonthlyRevenue = (props) => {
    const { value } = props;
    const translate = useTranslate();



    return (
        <>

            <CardWithIcon
                icon={DollarIcon}
                title={translate('pos.dashboard.monthly_revenue')}
                subtitle={value}
            />
        </>

    );
};

export default MonthlyRevenue;
