import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import "../assets/styles/admin.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Admin extends React.Component {
  state = {
    productList: [],

    addName: "",
    addPrice: 0,
    addImage: "",
    addDescription: "",
    addCategory: "",

    editId: 0,

    editName: "",
    editPrice: 0,
    editImage: "",
    editDescription: "",
    editCategory: "",
  };

  fetchProduct = () => {
    Axios.get(`${API_URL}/products`)
      .then((result) => {
        this.setState({ productList: result.data });
      })
      .catch((err) => {
        alert("Terjadi kesalahan di server");
      });
  };

  editToggle = (editData) => {
    this.setState({
      editId: editData.id,
      editName: editData.productName,
      editPrice: editData.price,
      editImage: editData.productImage,
      editDescription: editData.description,
      editCategory: editData.category,
    });
  };

  renderProduct = () => {
    return this.state.productList.map((val, index) => {
      if (val.id === this.state.editId) {
        return (
          <tr key={index}>
            <td>
              <input
                onChange={this.inputHandler}
                type="text"
                name="editId"
                value={val.id}
                disabled
                className="form-control"
              />
            </td>
            <td>
              <input
                onChange={this.inputHandler}
                type="text"
                name="editName"
                value={this.state.editName}
                className="form-control"
              />
            </td>
            <td>
              <input
                onChange={this.inputHandler}
                type="number"
                name="editPrice"
                value={this.state.editPrice}
                className="form-control"
              />
            </td>
            <td>
              <input
                onChange={this.inputHandler}
                type="text"
                name="editImage"
                value={this.state.editImage}
                className="form-control"
              />
            </td>
            <td>
              <input
                onChange={this.inputHandler}
                type="text"
                name="editDescription"
                value={this.state.editDescription}
                className="form-control"
              />
            </td>
            <td>
              <select
                name="editCategory"
                className="form-select"
                onChange={this.inputHandler}
              >
                <option value="">All</option>
                <option value="T-shirt">T-shirt</option>
                <option value="Pants">Pants</option>
                <option value="Accesories">Accesories</option>
              </select>
            </td>
            <td>
              <button
                onClick={() => this.saveEditHandle(val.id)}
                className="btn btn-success"
              >
                Save
              </button>
            </td>
            <td>
              <button onClick={this.cancleHandler} className="btn btn-warning">
                Cancle
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr key={index}>
          <td>{val.id}</td>
          <td>{val.productName}</td>
          <td>{val.price}</td>
          <td>
            <img
              className="admin-product-image"
              src={val.productImage}
              alt="Product"
            />
          </td>
          <td>{val.description}</td>
          <td>{val.category}</td>
          <td>
            <button
              // value={val.id}
              onClick={() => this.editToggle(val)}
              className="btn btn-secondary"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              onClick={this.deleteHandler}
              value={val.id}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: [value] });
  };

  addProductHandler = () => {
    Axios.post(`${API_URL}/products`, {
      productName: this.state.addName,
      price: parseInt(this.state.addPrice),
      productImage: this.state.addImage,
      description: this.state.addDescription,
      category: this.state.addCategory,
    })
      .then((result) => {
        alert("Berhasil menambahkan product");
        this.fetchProduct();
        this.setState({
          addName: "",
          addPrice: 0,
          addImage: "",
          addDescription: "",
          addCategory: "",
        });
      })
      .catch((err) => {
        alert("Terjadi kesalahan di server");
      });
  };

  saveEditHandle = (id) => {
    Axios.patch(`${API_URL}/products/${id}`, {
      productName: this.state.editName,
      price: parseInt(this.state.editPrice),
      productImage: this.state.editImage,
      description: this.state.editDescription,
      category: this.state.editCategory,
    })
      .then((result) => {
        alert("Berhasil Edit product");
        this.fetchProduct();
        this.setState({
          editId: 0,
        });
      })
      .catch((err) => {
        alert("Terjadi kesalahan di server");
      });
  };

  deleteHandler = (event) => {
    const confirmDelete = window.confirm("Yakin delete product?");
    if (confirmDelete) {
      Axios.delete(`${API_URL}/products/${event.target.value}`)
        .then((result) => {
          alert("Delete product berhasil");
          this.fetchProduct();
        })
        .catch((err) => {
          alert("Terjadi kesalahan di server");
        });
    } else {
      alert("Delete product dibatalkan");
    }
  };

  cancleHandler = () => {
    this.setState({ editId: 0 });
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    if (this.props.userGlobal.role !== "admin") {
      return <Redirect tp="/" />;
    }
    return (
      <div className="p-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Manage Products</h1>
            <table className="table mt-4">
              <thead className="bg-light">
                <tr>
                  <th>ID</th>
                  <th>name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>{this.renderProduct()}</tbody>
              <tfoot className="bg-light">
                <tr>
                  <td></td>
                  <td>
                    <input
                      value={this.state.addName}
                      name="addName"
                      type="text"
                      className="form-control"
                      onChange={this.inputHandler}
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addPrice}
                      name="addPrice"
                      type="number"
                      className="form-control"
                      onChange={this.inputHandler}
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addImage}
                      name="addImage"
                      type="text"
                      className="form-control"
                      onChange={this.inputHandler}
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addDescription}
                      name="addDescription"
                      type="text"
                      className="form-control"
                      onChange={this.inputHandler}
                    />
                  </td>
                  <td>
                    <select
                      name="addCategory"
                      className="form-select"
                      onChange={this.inputHandler}
                    >
                      <option value="">All</option>
                      <option value="T-shirt">T-shirt</option>
                      <option value="Pants">Pants</option>
                      <option value="Accesories">Accesories</option>
                    </select>
                  </td>
                  <td colSpan="2">
                    <button
                      onClick={this.addProductHandler}
                      className="btn btn-info"
                    >
                      Add Product
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(Admin);
