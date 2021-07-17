import React from "react";
import { connect } from "react-redux";
import { getCartData } from "../redux/actions/cart";
import Axios from "axios";
import { API_URL } from "../constants/API";

class Cart extends React.Component {
  btnDeleteHandler = (cartId) => {
    Axios.delete(`${API_URL}/carts/${cartId}`)
      .then((result) => {
        alert("Berhasil delete product dari cart");
        this.props.getCartData(this.props.userGlobal.id);
      })
      .catch(() => {
        alert("Terjadi kesalahan di server");
      });
  };

  renderCartList = () => {
    return this.props.cartGlobal.cartList.map((product, index) => {
      return (
        <tr key={index}>
          <td className="align-middle">{index + 1}</td>
          <td className="align-middle">{product.productName}</td>
          <td className="align-middle">{product.price}</td>
          <td className="align-middle">
            <img
              src={product.productImage}
              alt="product"
              style={{ height: "250px" }}
            />
          </td>
          <td className="align-middle">{product.quantity}</td>
          <td className="align-middle">{product.quantity * product.price}</td>
          <td className="align-middle">
            <button
              onClick={() => this.btnDeleteHandler(product.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="p-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Cart</h1>
            <table className="table mt-4">
              <thead className="thead-light">
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderCartList()}</tbody>
              <tfoot className="bg-light">
                <tr>
                  <td colSpan="6">
                    <button className="btn btn-success">Checkout</button>
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
    cartGlobal: state.cart,
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
