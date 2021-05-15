import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {Loader} from '../components/Loader'

export const DepositsPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [Deposits, setDeposits] = useState([])
    const history = useHistory();

    const requestHandler = async () => {
        try {
            history.goBack()
            history.push('/deposit/request_for_opening/')
        } catch (e) {}
    }

    const getDeposits = useCallback(async () => {
        const res = await request('http://localhost:3000/deposit/all/',  'GET', null, {
            Authorization: `Bearer ${token.access}`
        })
        setDeposits(res)
    }, [token, request])

    useEffect(() => {
        getDeposits()
      }, [getDeposits])

    if (loading) {
        return <Loader />
    }
    return (
        <div className="Deposits">
            {Deposits.map((item, id) => (
                <div className="Deposits" key={id}>
                    <h3>Contract number: {item?.contract_number}</h3>
                    <h3>Opening date: {item?.opening_date}</h3>
                    <h3>Closed date: {item?.closed_date}</h3>
                    <h3>Deposit amount: {item?.deposit_amount}</h3>
                    <h3>Final amount: {item?.final_amount}</h3>
                    <h3>Status: {item?.status}</h3>
                    <h3>Deposit type: {item?.deposit_type}</h3>
                    <hr />
                </div>
            ))}
            <div>
                <button 
                    className="btn grey lighten-1 black-text"
                    onClick={requestHandler}
                    disabled={loading}
                    >
                        Create Request For Deposit
                </button>
            </div>
        </div>
    )
}