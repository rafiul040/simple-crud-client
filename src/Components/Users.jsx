import { use, useState } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);

  // Add User
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

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
        if (data.insertedId) {
          newUser._id = data.insertedId;
          setUsers([...users, newUser]);
          alert("User added successfully ✅");
          e.target.reset();
        }
      });
  };

  // Delete User
  const handleDeleteUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after delete", data);
        if (data.deletedCount) {
          alert("User deleted successfully 🗑️");
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }
      });
  };

  return (
    <div>
      <h3>Users: {users.length}</h3>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" required />
        <br />
        <input type="email" name="email" placeholder="Email" required />
        <br />
        <button type="submit">Add User</button>
      </form>

      <hr />

      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} : {user.email}{" "}
            <button onClick={() => handleDeleteUser(user._id)}>x</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
