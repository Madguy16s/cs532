import * as React from 'react';
import { Datagrid, DateField, TextField, List, TextInput, EditButton, ArrayInput, SimpleFormIterator, ArrayField, Create, SimpleForm } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

export const IndustryList = (props) =>
(
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" multiline={true} />

        </Datagrid>
    </List>
)



export const IndustryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" multiline={true} />
        </SimpleForm>
    </Create>
)