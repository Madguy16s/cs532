import * as React from 'react';
import { Edit, ShowButton, Show, SimpleShowLayout, NumberField, Create, SimpleForm, Datagrid, ArrayInput, TextField, List, ImageInput, ImageField, EditButton, TextInput, NumberInput, SimpleFormIterator, ArrayField } from 'react-admin';

export const CompanyList = (props) => {
    console.log('props: ', props)
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="url" />
                <TextField source="name" />
                <TextField source="lastSurveyId" />
                <ArrayField source="vector">
                    <Datagrid>
                        <TextField source="number" />
                    </Datagrid>
                </ArrayField>
                <EditButton />
                <ShowButton />
            </Datagrid>
        </List>
    )
}

export const CompanyShow = (props) => (
    <Show title="Company View" {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="url" />
            <TextField source="description" multiline={true} />
            <ImageField source="logoUrl" />
            <NumberField title="survey ID" source="lastSurveyId" />
            <ArrayField title="issues" source="vector">
                <Datagrid>
                    <NumberField source="id" />
                    <TextField source="title" />
                    <TextField source="description" />
                    <NumberField source="score" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="industries">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
)

export const CompanyCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="url" />
                <TextInput source="description" multiline={true} />
                <ImageInput source="pictures" label="Related pictures" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
                <ArrayInput source="issues">
                    <SimpleFormIterator>
                        <NumberInput source="issueId" />
                        <NumberInput source="score" />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    )
}

export const CompanyEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="url" />
                <TextInput source="description" multiline={true} />

                <ImageInput source="pictures" label="Related pictures" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
                <NumberInput title="surveyId" source="lastSurveyId" />
                <ArrayInput title="issues" source="vector">
                    <SimpleFormIterator>
                        <TextInput source="id" />
                        <NumberInput source="score" />
                    </SimpleFormIterator>
                </ArrayInput>
                <ArrayInput source="industries">
                    <SimpleFormIterator>
                        <NumberInput source="id" />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
            
        </Edit>
    )
}


