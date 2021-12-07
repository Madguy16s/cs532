import * as React from 'react';
import {  EditButton, ShowButton, NumberInput, Show, NumberField, SimpleShowLayout, Datagrid, DateField, TextField, List, TextInput, ArrayInput, SimpleFormIterator, ArrayField, Create, SimpleForm } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

export const SurveyList = (props) => {
    console.log('props: ', props)
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="createdAt" />
                <EditButton/>
                <ShowButton/>
            </Datagrid>
        </List>
    )
}

export const SurveyCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ArrayInput source="issues">
                <SimpleFormIterator>
                    <NumberInput source="issueId" />
                    <NumberInput source="score" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
)

export const SurveyEdit = (props) => (
    <Show {...props}>
        <SimpleForm>
            <TextField title="id" source="surveyId" />
            <TextField source="createdAt" />
            <ArrayInput source="issues">
                <SimpleFormIterator>
                    <NumberInput source="id" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Show>
)

export const SurveyShow = (props) => (
    <Show title="Survey View" {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="createdAt" />
            <ArrayField source="issues">
                <Datagrid>
                    <NumberField source="id" />
                    <TextField source="title" />
                    <TextField source="description" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);