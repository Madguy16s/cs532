import * as React from 'react';
import { Edit, Datagrid, DateField, TextField, List, TextInput, EditButton, ArrayInput, SimpleFormIterator, ArrayField, Create, SimpleForm } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

export const LabList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <EditButton/>
            </Datagrid>
        </List>
    )
}