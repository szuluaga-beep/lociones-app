import React, { useState, useEffect } from "react";
import {
  addDocument,
  deleteDocument,
  getCollection,
  updateDocument,
} from "../../actions/actions";
import { isEmpty, size } from "lodash";
import "./style.css";

const Users = () => {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const result = await getCollection("Users");

      result.statusResponse && setUsers(result.data);
    })();
  }, []);

  const validForm = () => {
    let isValid = true;
    setError(null);

    if (isEmpty(user)) {
      setError("Debes ingresar un cliente.");
      isValid = false;
    }

    return isValid;
  };

  const addUser = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const result = await addDocument("Users", { name: user });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    setUsers([...users, { id: result.data.id, name: user }]);
    // console.log(newTask)
    setUser("");
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (isEmpty(user)) {
      alert("Client Empty");
      return;
    }

    const result = await updateDocument("Users", id, { name: user });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const editUser = users.map((item) =>
      item.id === id ? { id, name: user } : item
    );
    setUsers(editUser);
    setEditMode(false);
    setUser("");
    setId("");
  };

  const deleteUser = async (id) => {
    const result = await deleteDocument("Users", id);

    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const filteredProduct = users.filter((task) => task.id !== id);
    setUsers(filteredProduct);
  };

  const editUser = (theUser) => {
    setUser(theUser.name);
    setEditMode(true);
    setId(theUser.id);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center">Clientes</h1>
      <hr />
      <div className="row">
        <div className=" col-md-8 col-sm-12">
          <h4 className="text-center">Lista de clientes</h4>
          {size(users) === 0 ? (
            <h4 className="text-center text-danger">No hay clientes</h4>
          ) : (
            <ul className="list-group">
              {
                users.map((user) => (
                <li className="list-group-item" key={user.id}>
                  <span className="lead">{user.name}</span>
                  <button
                    className="btn btn-primary btn-sm float-end "
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => {
                      editUser(user);
                    }}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-4 col-sm-12">
          <h4>{editMode ? "Modificar cliente" : "Agregar cliente"}</h4>
          <form onSubmit={editMode ? saveUser : addUser}>
            {error && <span className="text-danger">{error}</span>}
            <textarea
              type="input"
              placeholder="Ingrese cliente..."
              className="form-control input-task"
              onChange={(text) => {
                setUser(text.target.value);
              }}
              value={user}
            />

            <button
              className={
                editMode
                  ? "btn btn-warning w-100 mt-2"
                  : "btn btn-dark w-100 mt-2"
              }
              type="submit"
            >
              {editMode ? "Guardar Cliente" : "Agregar Cliente"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Users;
