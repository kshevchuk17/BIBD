import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {Loader} from '../components/Loader'

export const DepositsTypePage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [DepositsType, setDepositsType] = useState([])
    const history = useHistory();


    const getDepositsType = useCallback(async () => {
        const res = await request('http://localhost:8000/deposit_type/all/',  'GET', null, {
            Authorization: `Bearer ${token.access}`
        })
        setDepositsType(res)
    }, [token, request])

    useEffect(() => {
        getDepositsType()
      }, [getDepositsType])

    if (loading) {
        return <Loader />
    }
    return (
        <div className="DepositsType">
            {DepositsType.map((item, id) => (
                <div className="DepositsType" key={id}>
                    <h3>Deposit name: {item?.deposit_name}</h3>
                    <h3>Deposit rate: {item?.deposit_rate}%</h3>
                    <h3>Deposit term: {item?.deposit_term} (года/лет)</h3>
                    <h3>Description: {item?.description}</h3>
                    <hr />
                </div>
            ))}
        </div>
    )
}