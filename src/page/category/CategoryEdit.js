import * as React from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    NumberField,
    ReferenceManyField,
    SimpleForm,
    TextInput,
    useTranslate,TextField
} from 'react-admin';

import ThumbnailField from './ThumbnailField';

const CategoryTitle = (props) => {
    const { record } = props;
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.categories.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

const CategoryEdit = (props) => (
    <Edit  {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceManyField
                reference="concessions"
                target="category_id"
                label="concessions"
                perPage={20}

            >
                <Datagrid>
                    <ThumbnailField />
                    <TextField source="name" />
                    <NumberField
                        source="price"
                        options={{ style: 'currency', currency: 'VND' }}
                    />
                    {/*<NumberField*/}
                    {/*    source="width"*/}
                    {/*    options={{ minimumFractionDigits: 2 }}*/}
                    {/*/>*/}
                    {/*<NumberField*/}
                    {/*    source="height"*/}
                    {/*    options={{ minimumFractionDigits: 2 }}*/}
                    {/*/>*/}
                    {/*<NumberField source="stock" />*/}
                    {/*<NumberField source="sales" />*/}
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
