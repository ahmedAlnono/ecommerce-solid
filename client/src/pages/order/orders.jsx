import axios from "axios";
import { For, createSignal } from "solid-js";
import CardItem from "../../components/card1/CardItem";

function Orders() {
  const [orders, setOrders] = createSignal([]);
  axios({
    method: "GET",
    url: "http://localhost:3000/orders",
    headers: {
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then((res) => {
    setOrders(res.data);
  });
  return (
    <div class="sm:p-3 flex flex-row flex-wrap justify-evenly">
      <For each={orders()}>
        {(order) => {
          return (
            <CardItem
              id={order.productId}
              quantity={`${order.quantity}`}
              description=""
              image={`${order.photo}`}
              price={order.price}
              createdAt={order.createdAt}
              button={true}
            />
          );
        }}
      </For>
    </div>
  );
}

export default Orders;
