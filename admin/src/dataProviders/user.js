import { getHeader } from ".";
import { SERVER_URL } from '../util/CONSTANTS';
import _ from 'lodash'

const user = {
    getList: async ({ filter, pagination, sort }) => {
        try {
            const { page, perPage } = pagination
            const request = new Request(`${SERVER_URL}/user`, {
                method: 'GET',
                headers: await getHeader(),
            });
            const response = await fetch(request)
            if (response.status < 200 || response.status >= 300) {
                throw new Error(await response.text());
            }
            let user = (await response.json()).map(i => ({
                ...i,
                id: parseInt(i.id)
            }))
            
            user = _.orderBy(user, [sort.field], [sort.order.toLowerCase()])
            const curPage = []
            for (let i = (page - 1) * perPage; i < user.length && i < page * perPage; i++) {
                curPage.push({
                    ...user[i],
                })
            }
            return Promise.resolve({
                data: curPage,
                total: user.length
            })
        } catch (err) {
            throw err
        }
    },
    // create: async ({ data }) => {
    //     try {
    //         const request = new Request(`${SERVER_URL}/survey/issue`, {
    //             method: 'POST',
    //             body: JSON.stringify(data),
    //             headers: await getHeader(),
    //         });
    //         const response = await fetch(request)
    //         if (response.status < 200 || response.status >= 300) {
    //             throw new Error(await response.text());
    //         }
    //         const { id } = await response.json()

    //         return Promise.resolve({
    //             data: 
    //                 {
    //                     ...data,
    //                     id: id
    //                 }
    
    //         })
    //     } catch (err) {
    //         throw err
    //     }
    // },
    // getOne: async ({ id }) => {
    //     try {
    //         const request = new Request(`${SERVER_URL}/survey/issue/${id}`, {
    //             method: 'GET',
    //             headers: await getHeader(),
    //         });
    //         const response = await fetch(request)
    //         if (response.status < 200 || response.status >= 300) {
    //             throw new Error(await response.text());
    //         }
    //         const json = await response.json()
    //         console.log("json: ", json)
    //         return Promise.resolve({
    //             data: json
    //         })
    //     } catch(err) {
    //         return Promise.reject(err)
    //     }
    // },
    // update: async({ id, data, previousData }) => {
    //     try {
    //         const request = new Request(`${SERVER_URL}/survey/issue`, {
    //             method: 'PUT',
    //             body: JSON.stringify(data),
    //             headers: await getHeader(),
    //         });
    //         const response = await fetch(request)
    //         if (response.status < 200 || response.status >= 300) {
    //             throw new Error(await response.text());
    //         }
    //         return Promise.resolve({
    //             data: data
    //         })
    //     } catch(err) {
    //         return Promise.reject(err)
    //     }
    // }
}

export default user