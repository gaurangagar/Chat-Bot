import React, { useState, useContext, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { CurrentUserDataContext } from '../context/CurrentUserContext';

const Signin = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(CurrentUserDataContext);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user]);

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('')

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

            setUser(response.data.user);
            navigate('/dashboard');
        } catch (error) {
            if (error.response?.data?.message) {
                seterror(error.response.data.message);
            } else {
                seterror('Something went wrong. Please try again.');
            }
        } finally {
            setemail('');
            setpassword('');
        }
    };

    return (
        <div>
            <div className='flex items-end justify-center underline'>
                <h1>ChatBot</h1>
            </div>
            <div className='flex items-end justify-center'>
                <h3>Please enter your credentials to login!</h3>
            </div>
            {error && <div className="flex items-end justify-center underline-offset-0">{error}</div>}
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
                <div className='flex justify-center'>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
            <div className='flex gap-2 justify-center mt-3'>
                <p>New Here....</p>
                <Link to="/signup"> Register Here</Link>
            </div>
            
        </div>
    );
};

export default Signin;
