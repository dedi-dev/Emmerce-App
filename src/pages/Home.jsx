import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { API_URL } from "../constants/API";

class Home extends React.Component {
  state = {
    productList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 5,
  };

  fetchProduct = () => {
    Axios.get(`${API_URL}/products`)
      .then((result) => {
        this.setState({
          productList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
        });
      })
      .catch(() => {
        alert("Terjadi kesalahan di server");
      });
  };

  renderProducts = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    const currentData = this.state.productList.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );
    return currentData.map((val) => {
      return <ProductCard productData={val} />;
    });
  };

  nextPagehandler = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  prevPagehandler = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-3">
            <div className="card">
              <div className="card-header">
                <strong>Fiter Products</strong>
              </div>
              <div className="card-body">
                <label htmlFor="searchProductName">Product Name</label>
                <input
                  type="text"
                  name="searchProductName"
                  className="form-control mb-3"
                />
                <label htmlFor="searchCategory">Product Category</label>
                <select name="searchCategory" className="form-control">
                  <option value="">All Item</option>
                  <option value="">T-shirt</option>
                  <option value="">Pants</option>
                  <option value="">Accesories</option>
                </select>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-header">
                <strong>Sort Products</strong>
              </div>
              <div className="card-body">
                <label htmlFor="searchCategory">Product Category</label>
                <select name="searchCategory" className="form-control">
                  <option value="">Default</option>
                  <option value="">Lowest Price</option>
                  <option value="">Highest Price</option>
                  <option value="">A-Z</option>
                  <option value="">Z-A</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <button
                  disabled={this.state.page === 1}
                  onClick={this.prevPagehandler}
                  className="btn btn-dark"
                >
                  {"<"}
                </button>
                <div className="text-center">
                  Page {this.state.page} of {this.state.maxPage}
                </div>
                <button
                  disabled={this.state.page === this.state.maxPage}
                  onClick={this.nextPagehandler}
                  className="btn btn-dark"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="d-flex flex-wrap flex-row">
              {/* Render Product Card */}
              {this.renderProducts()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
