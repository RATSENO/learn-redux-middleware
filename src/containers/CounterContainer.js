import { connect } from "react-redux";
import Counter from "../components/Counter";
import { increase, decrease } from "../modules/counter";

const CounterContainer = ({ increase, decrease, number }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease}></Counter>
  );
};

export default connect((state) => ({ number: state.counter }), {
  increase,
  decrease,
})(CounterContainer);
