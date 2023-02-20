import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { updateWithdrawalLimit } from '../actions/App';

const mapStateToProps = (state) => {
  return {
    ...state,
    limit: state.limit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateWithdrawalLimit: (data) => {
      dispatch(updateWithdrawalLimit(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
