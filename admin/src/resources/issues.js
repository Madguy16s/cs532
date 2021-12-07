import * as React from 'react';
import { Edit, Datagrid, DateField, TextField, List, TextInput, EditButton, ArrayInput, SimpleFormIterator, ArrayField, Create, SimpleForm } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

export const IssueList = (props) => {
    console.log('props: ', props)
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="description" />
                <EditButton/>
            </Datagrid>
        </List>
    )
}


export const IssueCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" multiline={true} />
        </SimpleForm>
    </Create>
)

export const IssueEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" multiline={true} />
        </SimpleForm>
    </Edit>
)


