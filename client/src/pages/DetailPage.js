
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {Loader} from '../components/Loader'

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [Profile, setProfile] = useState(null)
    const history = useHistory();

    const getProfile = useCallback(async () => {
        const res = await request('http://localhost:8000/profile/detail/',  'GET', null, {
            Authorization: `Bearer ${token.access}`
        })
        if (!res) {
            history.goBack()
            history.push('/profile/create/')
        }
        else if (res) {
            setProfile(res)
        }
    }, [token, request])

    useEffect(() => {
        getProfile()
      }, [])

    if (loading) {
        return <Loader />
    }
        return (
            <div>
                <h3>Username: {Profile?.user.username}</h3>
                <h3>Birth Date: {Profile?.birth_date}</h3>
                <h3>Phone number: {Profile?.phone_number}</h3>
                <h3>Passport number: {Profile?.passport_number}</h3>
                <h3>Identification number: {Profile?.identification_number}</h3>
                <h3>Place of birth: {Profile?.place_of_birth}</h3>
            </div>
        )
}