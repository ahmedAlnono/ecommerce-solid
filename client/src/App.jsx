import { For, Show, createSignal } from "solid-js";
import CardItem from "./components/card1/CardItem";
import "./index.css";
import ErrorPage from "./pages/error/error";
import styles from "./search.module.css";
import axios from "axios";

function App() {
  const [products, setProducts] = createSignal([]);
  const [error, setError] = createSignal(false);

  // fetch("http://localhost:3000/products")
  //   .then((res) => res.json())
  //   .then((res) => {
  //     setProducts(res);
  //     sessionStorage.setItem("products", JSON.stringify(res));
  //   })
  //   .catch((e) => {
  //     setError(true);
  //   });
  axios({
    method: "GET",
    url: "http://localhost:3000/products",
    headers: {
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  })
    .then((res) => {
      setProducts(res.data);
    })
    .catch((e) => {
      console.log(e);
      setError(true);
    });
  const [search, setSearch] = createSignal("");
  return (
    <>
      <div class={styles["search-bar"]}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (search() !== "") {
              await axios({
                method: "POST",
                url: "http://localhost:3000/products/search",
                data: {
                  title: search(),
                },
              }).then((res) => {
                setProducts(res.data);
              });
            } else {
              setProducts(JSON.parse(sessionStorage.getItem("products")));
            }
          }}
        >
          <input
            name="search"
            class={styles["search-input"]}
            type="text"
            placeholder="Search . . ."
            onInput={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button class={styles["submit-button"]} type="submit">
            &#x1F50E;&#xFE0E;
          </button>
        </form>
      </div>
      <div class="grid-container">
        <Show when={products() != []}>
          <For each={products()}>
            {(product) => (
              <CardItem
                id={product.id}
                title={product.name}
                description={product.description}
                price={product.price}
                image={product.photos[0]}
                sellerName={product.userName}
                createdAt={product.createdAt}
              />
            )}
          </For>
        </Show>
        <Show when={products() == []}>
          <h1>no product published yet</h1>
        </Show>
        <Show when={error()}>
          <ErrorPage />
          <br />
          <ErrorPage />
        </Show>
      </div>
    </>
  );
}

export default App;
