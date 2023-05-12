import React, { useState, useEffect } from "react";
import {
  addDocument,
  deleteDocument,
  getCollection,
  updateDocument,
} from "../../actions/actions";
import { isEmpty, size } from "lodash";
import "./style.css";

const Products = () => {
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const result = await getCollection("lociones");

      result.statusResponse && setProducts(result.data);
    })();
  }, []);

  const validForm = () => {
    let isValid = true;
    setError(null);

    if (isEmpty(product)) {
      setError("Debes ingresar un producto.");
      isValid = false;
    }

    return isValid;
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const result = await addDocument("lociones", { name: product });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    setProducts([...products, { id: result.data.id, name: product }]);
    // console.log(newTask)
    setProduct("");
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    if (isEmpty(product)) {
      alert("Product Empty");
      return;
    }

    const result = await updateDocument("lociones", id, { name: product });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const editProduct = products.map((item) =>
      item.id === id ? { id, name: product } : item
    );
    setProducts(editProduct);
    setEditMode(false);
    setProduct("");
    setId("");
  };

  const deleteProduct = async (id) => {
    const result = await deleteDocument("lociones", id);

    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const filteredProduct = products.filter((task) => task.id !== id);
    setProducts(filteredProduct);
  };

  const editProduct = (theProduct) => {
    setProduct(theProduct.name);
    setEditMode(true);
    setId(theProduct.id);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center">Productos</h1>
      <hr />
      <div className="row">
        <div className=" col-md-8 col-sm-12">
          <h4 className="text-center">Lista de productos</h4>
          {size(products) === 0 ? (
            <h4 className="text-center text-danger">No hay productos</h4>
          ) : (
            <ul className="list-group">
              {
                products.map((product) => (
                <li className="list-group-item" key={product.id}>
                  <span className="lead">{product.name}</span>
                  <button
                    className="btn btn-primary btn-sm float-end "
                    onClick={() => {
                      deleteProduct(product.id);
                    }}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => {
                      editProduct(product);
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
          <h4>{editMode ? "Modificar producto" : "Agregar producto"}</h4>
          <form onSubmit={editMode ? saveProduct : addProduct}>
            {error && <span className="text-danger">{error}</span>}
            <textarea
              type="input"
              placeholder="Ingrese producto..."
              className="form-control input-task"
              onChange={(text) => {
                setProduct(text.target.value);
              }}
              value={product}
            />

            <button
              className={
                editMode
                  ? "btn btn-warning w-100 mt-2"
                  : "btn btn-dark w-100 mt-2"
              }
              type="submit"
            >
              {editMode ? "Guardar Producto" : "Agregar Producto"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Products;
