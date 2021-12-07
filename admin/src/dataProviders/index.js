import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    GET_MANY,
    GET_MANY_REFERENCE,
} from 'react-admin';

import drugs from './drugs'
import user from './user'
import lab from './lab'
import prescription from './prescription';


const dataProviders = [
    {
        dataProvider: drugs,
        resources: ['drugs'],
    },
    {
        dataProvider: user,
        resources: ['user'],
    },
    {
        dataProvider: prescription,
        resources: ['prescription'],
    },
    {
        dataProvider: lab,
        resources: ['lab'],
    },
];

export default (type, resource, params) => {
    const dataProviderMapping = dataProviders.find((dp) =>
        dp.resources.includes(resource));

    const mappingType = {
        [GET_LIST]: 'getList',
        [GET_ONE]: 'getOne',
        [GET_MANY]: 'getMany',
        [GET_MANY_REFERENCE]: 'getManyReference',
        [CREATE]: 'create',
        [UPDATE]: 'update',
        [UPDATE_MANY]: 'updateMany',
        [DELETE]: 'delete',
    };
    return dataProviderMapping.dataProvider[mappingType[type]](params);
};

export const getHeader = async () => {
    return new Headers({ 
        'Content-Type': 'application/json', 
        'Authorization': await localStorage.getItem('token') 
    })
}
