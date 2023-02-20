import { connect } from 'react-redux';
import AccountDetails from '../components/AccountDetails';
import { updateBalance } from '../actions/App';

const mapStateToProps = (state) => {
  return {
    ...state,
    balance: state.balance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBalance: (data) => {
      dispatch(updateBalance(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
