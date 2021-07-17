import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import { getCartData } from "../redux/actions/cart";

class ProductDetail extends React.Component {
  state = {
    productData: {},
    productIdNotFound: false,
    qty: 1,
  };

  fetchProduct = () => {
    Axios.get(`${API_URL}/products`, {
      params: {
        id: this.props.match.params.productId,
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({ productData: result.data[0] });
        } else {
          this.setState({ productIdNotFound: true });
        }
      })
      .catch((err) => {
        alert("Terjadi kesalahan di server");
      });
  };

  qtyBtnHandler = (action) => {
    if (action === "increment") {
      this.setState({ qty: this.state.qty + 1 });
    } else if (action === "decrement" && this.state.qty > 1) {
      this.setState({ qty: this.state.qty - 1 });
    }
  };

  addToCartHandler = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.userGlobal.id,
        productId: this.state.productData.id,
      },
    }).then((result) => {
      if (result.data.length) {
        Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
          quantity: result.data[0].quantity + this.state.qty,
        })
          .then(() => {
            alert("Berhasil menambahkan product ke keranjang");
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert("Terjadi kesalahan di server");
          });
      } else {
        Axios.post(`${API_URL}/carts`, {
          userId: this.props.userGlobal.id,
          productId: this.state.productData.id,
          price: this.state.productData.price,
          productName: this.state.productData.productName,
          productImage: this.state.productData.productImage,
          quantity: this.state.qty,
        })
          .then(() => {
            alert("Berhasil menambahkan product ke keranjang");
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert("Terjadi kesalahan di server");
          });
      }
    });
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    return (
      <div className="container">
        {this.state.productIdNotFound ? (
          <div className="alert alert-warning mt-3 ">
            Product with ID {this.props.match.params.productId} has not been
            found
          </div>
        ) : (
          <div className="row mt-5">
            <div className="col-6">
              <img
                src={this.state.productData.productImage}
                alt="Product"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center">
              <h4>{this.state.productData.productName}</h4>
              <h5>Rp. {this.state.productData.price}</h5>
              <p>{this.state.productData.description}</p>
              <div className="d-flex flex-row align-items-center">
                <button
                  onClick={() => this.qtyBtnHandler("decrement")}
                  className="btn btn-primary mr-4"
                >
                  -
                </button>
                {this.state.qty}
                <button
                  onClick={() => this.qtyBtnHandler("increment")}
                  className="btn btn-primary ml-4"
                >
                  +
                </button>
              </div>
              <button
                onClick={this.addToCartHandler}
                className="btn btn-success mt-3"
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
