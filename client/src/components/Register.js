import React,  { Fragment, useState } from "react";

const Register = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const { email, password, name } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: 
        e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault()


        try {
            const body = { email, password, name };

            const response = await fetch("http://localhost:4000/api/v1/auth/register", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
            }
        );

        const parseRes = await response.json();
        console.log(parseRes);

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="email" placeholder="email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
                <input type="password" name="password" placeholder="password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
                <input type="text" name="name" placeholder="name" className="form-control my-3" value={name} onChange={e => onChange(e)} />
            </form>
            <button className="btn btn-success btn-block">Submit</button>
        </Fragment>
    )
};

export default Register;