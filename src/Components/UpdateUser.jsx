import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const user = useLoaderData()
    console.log(user)


    const handleUpdateUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email)

        const updatedUser = {name, email};
        console.log(updatedUser)
        fetch(``, {
            method: "PATCH"
        })
        .then(res => res.json())
        .then(data => {
            console.log("after Update", data)
        })
    }
    return (
        <div>
            <h2>Edit a user</h2>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name='name' defaultValue={user.name}/>
                <br />
                <input type="email" name='email' defaultValue={user.email}/>
                <br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default UpdateUser;