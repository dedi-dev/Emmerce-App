import React from "react";
import { connect } from "react-redux";
import { getCartData } from "../redux/actions/cart";
import Axios from "axios";
import { API_URL } from "../constants/API";

class Cart extends React.Component {
  state = {
    isCheckoutMode: false,
    recipientName: "",
    address: "",
    payment: 0,
  };

  deleteHandler = (cartId) => {
    Axios.delete(`${API_URL}/carts/${cartId}`)
      .then((result) => {
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
              style={{ height: "125px" }}
            />
          </td>
          <td className="align-middle">{product.quantity}</td>
          <td className="align-middle">{product.quantity * product.price}</td>
          <td className="align-middle">
            <button
              onClick={() => this.deleteHandler(product.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  btnCheckoutModeToggle = () => {
    this.setState({ isCheckoutMode: !this.state.isCheckoutMode });
  };

  renderSubTotal = () => {
    let subtotal = 0;
    for (let i = 0; i < this.props.cartGlobal.cartList.length; i++) {
      subtotal +=
        this.props.cartGlobal.cartList[i].price *
        this.props.cartGlobal.cartList[i].quantity;
    }
    return subtotal;
  };

  renderTaxFee = () => {
    return parseInt(this.renderSubTotal() * 0.05);
  };

  renderTotalPrice = () => {
    return parseInt(this.renderSubTotal() + this.renderTaxFee());
  };

  inputhandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  btnPaymentHandler = () => {
    if (this.state.payment < this.renderTotalPrice()) {
      alert(
        `Uang Anda kurang Rp.${this.renderTotalPrice() - this.state.payment}`
      );
      return;
    }

    if (this.state.payment > this.renderTotalPrice()) {
      alert(
        `Terima Kasih, Anda mendapat uang kembali Rp. ${
          this.state.payment - this.renderTotalPrice()
        } `
      );
    } else if (this.state.payment === this.renderTotalPrice()) {
      alert(`Terima Kasih`);
    }

    const date = new Date();
    Axios.post(`${API_URL}/transaction`, {
      userId: this.props.userGlobal.id,
      recipientName: this.state.recipientName,
      address: this.state.address,
      totalPrice: parseInt(this.renderTotalPrice()),
      totalPayment: parseInt(this.state.payment),
      transactionDate: `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`,
      transactionItems: this.props.cartGlobal.cartList,
    })
      .then((result) => {
        alert("Berhasil melakukan pembayaran");
        result.data.transactionItems.forEach((val) => {
          this.deleteHandler(val.id);
        });
      })
      .catch(() => {
        alert("Terjadi kesalahan di server");
      });
  };

  render() {
    return (
      <div className="p-2 text-center">
        <h1>Cart</h1>
        <div className="row">
          <div className="col-9 text-center">
            <table className="table">
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
                    <button
                      onClick={this.btnCheckoutModeToggle}
                      className="btn btn-success"
                    >
                      Checkout
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {this.state.isCheckoutMode ? (
            <div className="col-3">
              <div className="card">
                <div className="card-header text-left">
                  <strong>Order Summary</strong>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">
                    <span className="font-weight-bold">Subtotal Price</span>
                    <span>Rp. {this.renderSubTotal()}</span>
                  </div>
                  <div className="d-flex my-2 flex-row justify-content-between">
                    <span className="font-weight-bold">Tax Fee</span>
                    <span>Rp. {this.renderTaxFee()}</span>
                  </div>
                  <div className="d-flex my-2 flex-row justify-content-between">
                    <span className="font-weight-bold">Total Price</span>
                    <span>Rp. {this.renderTotalPrice()}</span>
                  </div>
                </div>
                <div className="card-body text-left border-top">
                  <label htmlFor="recipientName">Recipient Name :</label>
                  <input
                    onChange={this.inputhandler}
                    className="form-control mb-2"
                    type="text"
                    name="recipientName"
                  />
                  <label htmlFor="address">Address :</label>
                  <input
                    onChange={this.inputhandler}
                    className="form-control"
                    type="text"
                    name="address"
                  />
                </div>
                <div className="card-footer text-left border-top">
                  <div className="d-flex flex-row justify-content-between">
                    <input
                      onChange={this.inputhandler}
                      name="payment"
                      type="number"
                      className="form-control mx-1"
                    />
                    <button
                      onClick={this.btnPaymentHandler}
                      className="btn btn-success mx-1"
                    >
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
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
