import { connect } from 'react-redux';
import TransactionsPage from '../components/TransactionsPage';
import { getTransactionList } from '../actions/App';

const mapStateToProps = (state) => {
  return {
    ...state,
    transactionList: state.transactionList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionList: (data) => {
      dispatch(getTransactionList(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);
