import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const CreateRequestDepositPage = () => {
    const { token } = useContext(AuthContext)
    const history = useHistory()
    const { loading, request } = useHttp()
    const [DepositsType, setDepositsType] = useState([])
    const [form, setForm] = useState({
        deposit_amount: '', deposit_type: ''
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const requestHandler = async () => {
        try {
            const data = await request('http://localhost:8000/deposit/request_for_opening/', 'POST', form, {
                Authorization: `Bearer ${token.access}`
            })
            // history.goBack()
            // history.push('/profile/detail/')
        } catch (e) { }
    }

    const getDepositsType = useCallback(async () => {
        const res = await request('http://localhost:8000/deposit_type/all/', 'GET', null, {
            Authorization: `Bearer ${token.access}`
        })
        console.log(res)
        setDepositsType(res)
    }, [token, request])

    useEffect(() => {
        getDepositsType()
    }, [])

    return (
        <div className="row">
            <h1>Create request</h1>
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input
                        placeholder="Enter amount of deposit"
                        id="amount"
                        type="number"
                        name="deposit_amount"
                        value={form.deposit_amount}
                        onChange={changeHandler}
                    />
                    <label htmlFor="link">Enter amount of deposit</label>
                </div>
                <div className="DepositsType" id="">
                    <select size={DepositsType.length}>
                        {DepositsType.map((item, id) => (
                        <option key={id} value={form.deposit_type}>{item?.deposit_type}</option>
                    ))}
                    </select>
                </div>
                <button
                    className="btn grey lighten-1 black-text"
                    onClick={requestHandler}
                    disabled={loading}
                >
                    Create request
            </button>
            </div>
        </div>
    )
}
