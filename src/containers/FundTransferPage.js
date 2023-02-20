import { connect } from 'react-redux';
import FundTransferPage from '../components/FundTransferPage';

const mapStateToProps = (state) => {
  return {
    ...state,
    limit: state.limit,
  };
};

export default connect(mapStateToProps)(FundTransferPage);
