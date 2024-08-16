import { decrement, increment, incrementAsync, incrementByAmount } from "@/stores/counterSlice";
import { AppDispatch, RootState } from "@/stores/store"
import { useDispatch, useSelector } from "react-redux"

export default function Counter() {

    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
        <h1>Counter</h1>
        <h2>{count}</h2>
        <div className="flex gap-3">
            <button className="btn_custom" onClick={() => dispatch(increment())}>+</button>
            <button className="btn_custom" onClick={() => dispatch(decrement())}>-</button>
            <button className="btn_custom" onClick={() => dispatch(incrementByAmount({value: 10}))}>10</button>
            <button className="btn_custom" onClick={() => dispatch(incrementAsync(10))}>async 10</button>
        </div>
    </div>
  )
}
