import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {Loader} from '../components/Loader'

export const CreditsPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [Credits, setCredits] = useState([])
    const history = useHistory();


    const getCredits = useCallback(async () => {
        console.log('before request')
        const res = await request('http://localhost:8000/credit/all/',  'GET', null, {
            Authorization: `Bearer ${token.access}`
        })
        console.log('after request')
        setCredits(res)
    }, [token, request])

    useEffect(() => {
        getCredits()
      }, [getCredits])

    if (loading) {
        console.log('loader')
        return <Loader />
    }
    return (
        <div className="Credits">
            {Credits.map((item, id) => (
                <div className="Credits" key={id}>
                    <h3>Contract number: {item?.contract_number}</h3>
                    <h3>Opening date: {item?.opening_date}</h3>
                    <h3>Closed date: {item?.closed_date}</h3>
                    <h3>Credit Amount: {item?.credit_amount}</h3>
                    <h3>Payment amount: {item?.payment_amount}</h3>
                    <h3>Status: {item?.status}</h3>
                    <h3>Overdeue status: {item?.overdue_status}</h3>
                    <h3>Paid off: {item?.paid_off}</h3>
                    <h3>Remains: {item?.remains}</h3>
                    <h3>Payment per month: {item?.payment_per_month}</h3>
                    <h3>Credit type: {item?.credit_type}</h3>
                    <hr />
                </div>
            ))}
        </div>
    )
}