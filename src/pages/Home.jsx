import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { API_URL } from "../constants/API";

class Home extends React.Component {
  state = {
    productList: [],
    filteredProductList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 5,
    searchProductName: "",
    searchCategory: "",
    sortBy: "",
  };

  fetchProduct = () => {
    Axios.get(`${API_URL}/products`)
      .then((result) => {
        this.setState({
          productList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
          filteredProductList: result.data,
        });
      })
      .catch(() => {
        alert("Terjadi kesalahan di server");
      });
  };

  renderProducts() {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    let rawData = [...this.state.filteredProductList];

    const compareString = (a, b) => {
      if (a.productName < b.productName) {
        return -1;
      }
      if (a.productName > b.productName) {
        return 1;
      }
      return 0;
    };

    switch (this.state.sortBy.toString()) {
      case "lowestPrice":
        rawData.sort((a, b) => a.price - b.price);
        break;
      case "highestPrice":
        rawData.sort((a, b) => b.price - a.price);
        break;
      case "az":
        rawData.sort(compareString);
        break;
      case "za":
        rawData.sort((a, b) => compareString(b, a));
        break;
      default:
        rawData = [...this.state.filteredProductList];
        break;
    }
    const currentData = rawData.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );
    return currentData.map((item, index) => {
      return (
        <div key={index}>
          <ProductCard productData={item} />
        </div>
      );
    });
  }

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

  inputHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: [value] });
  };

  btnSearchHandler = () => {
    const filteredProductList = this.state.productList.filter((product) => {
      return (
        product.productName
          .toLowerCase()
          .includes(this.state.searchProductName.toString().toLowerCase()) &&
        product.category.includes(this.state.searchCategory)
      );
    });
    this.setState({
      filteredProductList,
      maxPage: Math.ceil(filteredProductList.length / this.state.itemPerPage),
      page: 1,
    });
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
                  onChange={this.inputHandler}
                  type="text"
                  name="searchProductName"
                  className="form-control mb-3"
                />
                <label htmlFor="searchCategory">Product Category</label>
                <select
                  name="searchCategory"
                  onChange={this.inputHandler}
                  className="form-control"
                >
                  <option value="">All Item</option>
                  <option value="T-shirt">T-shirt</option>
                  <option value="Pants">Pants</option>
                  <option value="Accesories">Accesories</option>
                </select>
                <button
                  className="btn btn-primary mt-2"
                  onClick={this.btnSearchHandler}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-header">
                <strong>Sort Products</strong>
              </div>
              <div className="card-body">
                <label htmlFor="sortBy">Product Category</label>
                <select
                  onChange={this.inputHandler}
                  name="sortBy"
                  className="form-control"
                >
                  <option value="">Default</option>
                  <option value="lowestPrice">Lowest Price</option>
                  <option value="highestPrice">Highest Price</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
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
