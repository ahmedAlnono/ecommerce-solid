import { Link } from "@solidjs/router";
import "./cardItem.css";
import { Show } from "solid-js";

const CardItem = (props) => {
  const {
    quantity,
    title,
    description,
    price,
    image,
    sellerName,
    id,
    createdAt,
  } = props;
  const date = new Date(createdAt);
  return (
    <div class="card-container">
      <Link href={`/product/${id}`} class="hero-image-container">
        <img class="hero-image" src={image} alt="Spinning glass cube" />
      </Link>
      <main class="main-content">
        <Show when={title}>
          <h1>
            <a href="#">{title}</a>
          </h1>
        </Show>
        <Show when={quantity}>
          <h1>quantity is : {quantity}</h1>
        </Show>
        <p>{description}</p>
        <div class="flex-row">
          <div class="coin-base">
            <h2 class="price dolar">{price}</h2>
          </div>
          <div class="coin-base"></div>
          <div class="time-left">
            {/* <img
              src="https://i.postimg.cc/prpyV4mH/clock-selection-no-bg.png"
              alt="clock"
              class="small-image"
            /> */}
            <p>{date.toDateString()}</p>
          </div>
        </div>
      </main>
      <Show when={sellerName}>
        <div class="card-attribute">
          <img
            src="https://i.postimg.cc/SQBzNQf1/image-avatar.png"
            alt="avatar"
            class="small-avatar"
          />
          <p>
            Seller{" "}
            <span>
              <a href="#">{sellerName}</a>
            </span>
          </p>
        </div>
      </Show>
      <Show when={props.button}>
        <hr />
        <br />
        <br />
        <button class="bg-green-300 px-5 py-2 rounded-lg hover:bg-green-400 transition-all">
          <a href="#" class="text-lg font-semibold">
            Buy
          </a>
        </button>
      </Show>
    </div>
  );
};

export default CardItem;
