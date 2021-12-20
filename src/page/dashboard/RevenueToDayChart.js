import * as React from 'react';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';


const RevenueToDayChart = (props) => {
    const { value } = props;
    const translate = useTranslate();

    return (
        <>
            <CardWithIcon
                icon={DollarIcon}
                title={translate('dashboard.today_revenue')}
                subtitle={value}
            />
        </>
    );
};

export default RevenueToDayChart;
