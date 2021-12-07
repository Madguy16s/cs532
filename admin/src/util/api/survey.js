import React from 'react'
import { useMutation, useQuery } from 'react-query'
import axios from '../axios'

export const useGetSurvey = (token) => (
    useQuery('survey', async () => {
        try {
            const res = await axios.get(
                '/survey',
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                }
            )
            return res.data
        } catch (err) {
            throw err
        }
    },
        {
            enabled: token != null
        }
    )
)

export const usePostSurvey = (token) => (
    useMutation('survey', async survey => {
        try {
            const res = await axios.post('/survey/submit', survey,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                }
            )
        } catch (err) {
            throw err
        }
    },
        {
            enabled: token != null
        })
)