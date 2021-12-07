import React from 'react';
import { Admin, Resource, ListGuesser, ShowGuesser } from 'react-admin';
import authProvider from './authProvider';
import dataProvider from './dataProviders';
import { CompanyList, CompanyCreate, CompanyShow, CompanyEdit } from './resources/companies';
import { IssueList, IssueCreate, IssueEdit } from './resources/issues';
import { SurveyList, SurveyShow, SurveyCreate } from './resources/surveys';
import { IndustryList, IndustryCreate } from './resources/industries';
import { DrugList } from './resources/drugs';
import { UserList } from './resources/user';
import { PrescriptionList } from './resources/prescription';
import { LabList } from './resources/lab';


const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    {/* <Resource name="companies" list={CompanyList} create={CompanyCreate} show={CompanyShow} edit={CompanyEdit} />
    <Resource name="surveys" list={SurveyList} show={SurveyShow} create={SurveyCreate} />
    <Resource name="issues" list={IssueList} create={IssueCreate} edit={IssueEdit}/>
    <Resource name="industries" list={IndustryList} create={IndustryCreate} /> */}
    <Resource name="drugs" list={DrugList}/>
    <Resource name="user" list={UserList}/>
    <Resource name="prescription" list={PrescriptionList}/>
    <Resource name="lab" list={LabList}/>

  </Admin>
);

export default App;