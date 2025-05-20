import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CurrentUserDataContext } from '../context/CurrentUserContext';

const Signin = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(CurrentUserDataContext);

    useEffect(() => {
        if (user) {
            return navigate('/dashboard');
        }
    }, [user]);

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        };
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/user/login`,
                user,
                { withCredentials: true }
            );
            console.log(response);
            navigate('/dashboard');
            setemail('');
            setpassword('');
            console.log('logged in');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value);
                        }}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signin;
