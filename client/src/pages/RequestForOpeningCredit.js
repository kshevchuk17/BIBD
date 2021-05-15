import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const CreateRequestCreditPage = () => {
    const { token } = useContext(AuthContext)
    const history = useHistory()
    const { loading, request } = useHttp()
    const [CreditsType, setCreditsType] = useState([])
    const [form, setForm] = useState({
        credit_amount: '', credit_type: ''
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const requestHandler = async () => {
        try {
            const data = await request('http://localhost:8000/credit/request_for_opening/', 'POST', form, {
                Authorization: `Bearer ${token.access}`
            })
        } catch (e) { }
    }
    const getCreditsType = useCallback(async () => {
        const res = await request('http://localhost:8000/credit_type/all/', 'GET', null, {
            Authorization: `Bearer ${token.access}`
        })
        console.log(res)
        setCreditsType(res)
        console.log(CreditsType)
    }, [token, request])

    useEffect(() => {
        getCreditsType()
    }, [getCreditsType])

    return (
        <div className="row">
            <h1>Create request</h1>
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input
                        placeholder="Enter amount of credit"
                        id="amount"
                        type="number"
                        name="credit_amount"
                        value={form.credit_amount}
                        onChange={changeHandler}
                    />
                    <label htmlFor="link">Enter amount of deposit</label>
                </div>
                <div>
                    <select size={CreditsType?.length} value={form.credit_type} onChange={changeHandler} style={{display: 'block'}}>
                        {CreditsType?.map((item, id) => (
                        <option value={form.credit_type} onChange={changeHandler} key={id}>{item?.credit_name}</option>
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
