import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";

class History extends React.Component {
  state = {
    transactionList: [],
    transactionDetails: [],
  };

  fetchTransaction = () => {
    Axios.get(`${API_URL}/transaction`, {
      params: {
        userId: this.props.userGlobal.id,
      },
    })
      .then((result) => {
        this.setState({ transactionList: result.data });
      })
      .catch(() => {
        alert("Terjadi kesalahan di server");
      });
  };

  btnSeeDetailshandle = (transactionDetails) => {
    this.setState({ transactionDetails: transactionDetails });
  };

  renderTransactionList = () => {
    return this.state.transactionList.map((val, index) => {
      return (
        <tr key={index}>
          <td>{val.transactionDate}</td>
          <td>{val.transactionItems.length} item(s)</td>
          <td>{val.totalPrice}</td>
          <td>
            <button
              onClick={() => this.btnSeeDetailshandle(val.transactionItems)}
              className="btn btn-info"
            >
              See Details
            </button>
          </td>
        </tr>
      );
    });
  };

  renderTransactionDetailsItems = () => {
    return this.state.transactionDetails.map((val, index) => {
      return (
        <div key={index} className="d-flex flex-row justify-content-between">
          <span className="font-weight-bold">
            {val.productName} ({val.quantity})
          </span>
          <span>Rp. {val.quantity * val.price}</span>
        </div>
      );
    });
  };

  componentDidMount() {
    this.fetchTransaction();
  }

  render() {
    return (
      <div className="p-5">
        <h1>Transaction History</h1>
        <div className="row mt-5">
          <div className="col-8">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Transaction Data</th>
                  <th>Total items</th>
                  <th>total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderTransactionList()}</tbody>
            </table>
          </div>
          <div className="col-4">
            {this.state.transactionDetails.length ? (
              <div className="card">
                <div className="card-header">
                  <strong>Transaction Details</strong>
                </div>
                <div className="card-body">
                  {this.renderTransactionDetailsItems()}
                </div>
              </div>
            ) : null}
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

export default connect(mapStateToProps)(History);
