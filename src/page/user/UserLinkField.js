import * as React from 'react';
import { Link } from 'react-admin';

import FullNameField from './FullNameField';

const UserLinkField = (props) => {
    return (
        props.record ? (
            <Link to={ `/users/${props.record.id}`}>
                <FullNameField {...props} />
            </Link>
        ) : null
    );
}


UserLinkField.defaultProps = {
    source: 'createdBy',
    addLabel: true,
};


export default UserLinkField;
