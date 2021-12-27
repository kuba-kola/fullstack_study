import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHtpp } from "../hooks/htpp.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, req, clearError} = useHtpp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])
    const changeHendler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await req('/api/auth/register', 'POST', {...form});
            message(data.message)
        } catch(e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await req('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId)
        } catch(e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Task 5-6</h1>
                <div className="card teal accent-3">
                    <div className="card-content white-text">
                        <span className="card-title">Аўтарызацыя</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Увядзіце email" id="email" type="text" name="email" onChange={changeHendler} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Увядзіце пароль" id="password" type="password" name="password" onChange={changeHendler} />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="lime black-text" disabled={loading} onClick={loginHandler}>Увайсці</button>
                        <button className="orange lighten-1 black-text" onClick={registerHandler} disabled={loading}>Рэгістрацыя</button>
                    </div>
                </div>
            </div>
        </div>
    )
}