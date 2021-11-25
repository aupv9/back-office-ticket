import * as React from 'react';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

const MonthlyRevenue = (props) => {
    const { value } = props;
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/commands"
            icon={DollarIcon}
            title={translate('pos.dashboard.monthly_revenue')}
            subtitle={value}
        />
    );
};

export default MonthlyRevenue;
