import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    const {token} = useContext(AuthContext)
    const history = useHistory()
    const {loading, request} = useHttp()
    const [form, setForm] = useState({
        birth_date: '', phone_number: '', passport_number: '', identification_number: '', place_of_birth: ''
})

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
}

const profileHandler = async () => {
    try {
        const data = await request('http://localhost:8000/profile/create/', 'POST', form, {
            Authorization: `Bearer ${token.access}`
        })
        history.goBack()
        history.push('/profile/detail/')
    } catch (e) {}
}

  return (
    <div className="row">
        <h1>Create Profile</h1>
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            placeholder="Enter Birth Date"
            id="birth_date"
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={changeHandler}
          />
          <label htmlFor="link">Enter Birth Date</label>
        </div>
        <div className="input-field">
          <input
            placeholder="Enter Phone Number"
            id="phone_number"
            type="text"
            name="phone_number"
            maxLength="13"
            value={form.phone_number}
            onChange={changeHandler}
          />
          <label htmlFor="link">Enter Phone Number</label>
        </div>
        <div className="input-field">
          <input
            placeholder="Enter Passport Number"
            id="passport_number"
            type="text"
            name="passport_number"
            maxLength="9"
            value={form.passport_number}
            onChange={changeHandler}
          />
          <label htmlFor="link">Enter Passport Number</label>
        </div>
        <div className="input-field">
          <input
            placeholder="Enter Identificator Passport Number"
            id="identification_number"
            type="text"
            name="identification_number"
            maxLength="9"
            value={form.identification_number}
            onChange={changeHandler}
          />
          <label htmlFor="link">Enter Identificator Passport Number</label>
        </div>
        <div className="input-field">
          <input
            placeholder="Enter Place of Birth"
            id="place_of_birth"
            type="text"
            name="place_of_birth"
            maxLength="255"
            value={form.place_of_birth}
            onChange={changeHandler}
          />
          <label htmlFor="link">Enter Place of Birth</label>
        </div>
        <button 
            className="btn grey lighten-1 black-text"
            onClick={profileHandler}
            disabled={loading}
            >
                Create Profile
            </button>
      </div>
    </div>
  )
}