import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {Loader} from '../components/Loader'

export const CreditsTypePage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [CredetsType, setCreditsType] = useState([])
    const history = useHistory();


    const getCreditsType = useCallback(async () => {
        const res = await request('http://localhost:8000/credit_type/all/',  'GET', null, {
            Authorization: `Bearer ${token.access}`
        })
        setCreditsType(res)
    }, [token, request])

    useEffect(() => {
        getCreditsType()
      }, [getCreditsType])

    if (loading) {
        return <Loader />
    }
    return (
        <div className="CredetsType">
            {CredetsType.map((item, id) => (
                <div className="CredetsType" key={id}>
                    <h3>Credit name: {item?.credit_name}</h3>
                    <h3>Credit rate: {item?.credit_rate}%</h3>
                    <h3>Credit term: {item?.credit_term} (года/лет)</h3>
                    <h3>Description: {item?.description}</h3>
                    <hr />
                </div>
            ))}
        </div>
    )
}