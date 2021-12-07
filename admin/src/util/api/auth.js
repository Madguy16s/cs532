import React from 'react'
import { useQuery, useMutation } from 'react-query'
import axios from '../axios'

export const useSignIn = (callback = async (e, t) => { }) => (
    useMutation('signIn', async ({ email, password }) => {
        try {
            const res = await axios(`/user/login`, {
                method: "post",
                data: {
                    email: email,
                    password: password
                },
            }
            )
            await callback(email, res.data.token)
            return res
        } catch (err) {
            console.log("err: ", err)
            throw err.response.data
        }
    })
)

export const useSignUp = () => (
    useMutation('signUp', async ({ email, password }) => {
        try {
            const res = await axios.post(`/user/register`, {
                email: email,
                password: password
            })
            return res
        } catch (err) {
            console.log(err)
            throw err.response.data
        }
    })
)

export const useGoogleSignIn = (callback = async (e, t) => { }) => (
    useMutation('googleSignIn', async googleData => {
        try {
            const res = await axios.post(`/user/google_sign_in`,
                {
                    token: googleData.tokenId
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const { email, token } = res.data
            await callback(email, token)
            return res.data
        } catch (err) {
            console.log('err: ', err)
            throw err.response.data
        }
    })
)