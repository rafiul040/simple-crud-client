import React from "react";

const Users = () => {
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    const newUser = { name, email };


    
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after saving user", data);
      });
  };

  return (
    <div>
      <form onSubmit={handleAddUser} action="">
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" />
        <br />
        <button>Add User</button>
      </form>
    </div>
  );
};

export default Users;
