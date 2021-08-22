import React,  { Fragment, useState } from "react";

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]
            : e.target.value });
        };
    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { email, password };
            const response = await fetch("http://localhost:4000/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });

        const parseRes = await response.json();
        console.log(parseRes);

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form>
                <input type="email" name="email" placeholder="email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
                <input type="password" name="password" placeholder="password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
        </Fragment>
    )
}

export default Login;