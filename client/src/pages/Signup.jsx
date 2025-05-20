import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CurrentUserDataContext } from '../context/CurrentUserContext';

const Signup = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(CurrentUserDataContext);

    useEffect(() => {
        if (user) {
            return navigate('/dashboard');
        }
    }, [user, navigate]);

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [userName, setuserName] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        const user = {
            fullName: {
                firstName: firstName,
                lastName: lastName,
            },
            userName: userName,
            email: email,
            password: password,
        };
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/user/register`,
                user
            );
            console.log(response);
            navigate('/dashboard');
            setemail('');
            setpassword('');
            setfirstName('');
            setlastName('');
            setuserName('');
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">
                        Name
                    </label>
                    <div className="flex gap-0.5">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleFirstName"
                            aria-describedby="nameHelp"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => {
                                setfirstName(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            className="form-control"
                            id="exampleLastName"
                            aria-describedby="nameHelp"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => {
                                setlastName(e.target.value);
                            }}
                        />
                    </div>
                </div>
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
                    <label htmlFor="exampleInputUserName" className="form-label">
                        UserName
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputUserName"
                        value={userName}
                        onChange={(e) => {
                            setuserName(e.target.value);
                        }}
                    />
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

export default Signup;