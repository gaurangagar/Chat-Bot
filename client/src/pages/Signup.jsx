import React from 'react';

const Signup = () => {
    return (
        <div>
            <form>
            <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">
                        Name
                    </label>
                    <div className='flex gap-0.5'>
                    <input
                        type="name"
                        className="form-control"
                        id="exampleInputName"
                        aria-describedby="nameHelp"
                        placeholder='First Name'
                    />
                    <input
                    type="name"
                    className="form-control"
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                    placeholder='Last Name'
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
                        type="name"
                        className="form-control"
                        id="exampleInputUserName"
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