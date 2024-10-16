import { useLocation, useNavigate, useParams } from "@solidjs/router";
import ErrorPage from "../error/error";
import axios from "axios";
import { For, Show, createEffect, createMemo, createSignal } from "solid-js";
import Message from "../../components/message/message";

interface Product {
  id: number;
  name: string;
  description: string;
  userName: string;
  createdAt?: Date;
  deletedAt: Date | null;
  updatedAt?: Date | null;
  photos: string[];
  price: string;
  type: string[];
  userId: number;
}

const Product = () => {
  const [product, setProduct] = createSignal<Product>();
  const [error, setError] = createSignal(false);
  const [quantity, setQuantity] = createSignal(1);
  const [rating, setRating] = createSignal(1);
  const [id, setId] = createSignal(1);
  const [isRated, setIsRated] = createSignal(false);
  const [showMessage, setShowMessage] = createSignal("");
  createEffect(async () => {
    const pathName = useLocation().pathname;
    if (pathName.includes("product")) {
      const id = +pathName.slice(pathName.lastIndexOf("/") + 1);
      setId(id);
      if (typeof id !== "number") {
        setError(true);
        return;
      }
      await axios({
        method: "GET",
        url: `http://localhost:3000/products/${id}`,
      }).then((res) => {
        setProduct(res.data);
      });
    }
  });
  if (error()) {
    return <ErrorPage />;
  }
  return (
    <>
      {/* product photos and details */}
      <div class="container mx-auto my-5">
        <div class="md:flex md:space-x-6">
          <div class="md:w-1/2">
            <div class="md:w-96 main-img">
              <img
                class="w-full hidden md:block"
                // src="https://cdn.pixabay.com/photo/2015/07/24/18/40/model-858753_960_720.jpg"
                src={product()?.photos[0]}
                alt="Product"
              />
              <div class="md:flex md:my-3 previews">
                <For each={product()?.photos}>
                  {(photo) => {
                    return (
                      <>
                        <div class="md:w-1/4 m-4 md:m-1">
                          <img class="w-full" src={photo} alt="Sale" />
                        </div>
                      </>
                    );
                  }}
                </For>
              </div>

              {/* product details */}
            </div>
          </div>
          <div class="md:w-1/2">
            <div class="px-4 md:px-0 main-description">
              <div class="text-bold text-lg md:text-2xl text-color text-slate-600">
                Category: {product()?.type[0] + " "}
              </div>
              <div class="text-bold my-3 text-2xl md:text-4xl text-white">
                {product()?.name}
              </div>
              <div class="my-4">
                <p class="text-2xl md:text-4xl text-bol text-green-500">
                  {product()?.price}
                </p>
              </div>
              <div class="my-5 flex md:space-x-0 gap-3 flex-wrap md:flex-nowrap justify-center">
                <div class="block md:w-1/3">
                  <button
                    onClick={async () => {
                      await axios({
                        method: "POST",
                        url: `http://localhost:3000/user/add/wish/${id()}`,
                        headers: {
                          authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                          )}`,
                        },
                      }).then(() => {
                        setShowMessage("product add to wish list");
                        setTimeout(() => {
                          setShowMessage("");
                        }, 8000);
                      });
                    }}
                    class="shadow bg-blue-500 text-white px-4 py-2 rounded-lg custom-btn"
                  >
                    Wishlist
                  </button>
                </div>
                <div class="block md:w-1/3">
                  <button
                    onClick={async () => {
                      await axios({
                        method: "POST",
                        url: "http://localhost:3000/orders",
                        data: {
                          quantity: quantity(),
                          productId: id(),
                        },
                        headers: {
                          authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                          )}`,
                        },
                      }).then(() => {
                        setShowMessage("order successfully created");
                        setTimeout(() => {
                          setShowMessage("");
                        }, 8000);
                      });
                    }}
                    class="shadow bg-blue-500 text-white px-4 py-2 rounded-lg custom-btn"
                  >
                    Add to cart
                  </button>
                </div>
                <div class="block md:w-1/3 quantity">
                  <input
                    type="number"
                    class="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-600"
                    id="cart_quantity"
                    value="1"
                    min="0"
                    max="5"
                    placeholder="Enter email"
                    name="cart_quantity"
                    onInput={(e) => {
                      setQuantity(+e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div class="my-4 product-details">
              <p class="text-slate-300 text-2xl md:text-3xl mb-2">
                Product Details
              </p>
              <p class="text-base md:text-lg">{product()?.description}</p>
            </div>
            <div class="my-4 product-details">
              <p class="text-slate-300 text-2xl md:text-3xl mb-2">Sold by</p>
              <ul class="list-disc list-inside text-base md:text-lg">
                <li class="list-none text-slate-700">{product()?.userName}</li>
              </ul>
            </div>
            <div class="flex items-center justify-around flex-wrap">
              <div>
                <For each={[1, 2, 3, 4, 5]}>
                  {(number) => {
                    let num = rating();
                    return (
                      <>
                        <button
                          onMouseOver={() => {
                            setRating(number);
                          }}
                          classList={{
                            "text-yellow-300": number <= rating(),
                            "text-white": number > rating(),
                          }}
                          class="text-3xl sm:text-5xl p-3"
                        >
                          &#9733;
                        </button>
                      </>
                    );
                  }}
                </For>
              </div>
              <button
                onClick={async () => {
                  if (!isRated()) {
                    await axios({
                      method: "POST",
                      url: `http://localhost:3000/products/rate/${id()}`,
                      data: {
                        rate: +rating(),
                      },
                      headers: {
                        authorization: `Bearer ${localStorage.getItem(
                          "access_token"
                        )}`,
                      },
                    })
                      .then(() => {
                        setIsRated(true);
                      })
                      .then(() => {
                        setShowMessage("thank you for rating");
                        setTimeout(() => {
                          setShowMessage("");
                        }, 8000);
                      });
                  }
                }}
                class="p-5 border-none bg-lime-600 text-white"
              >
                Send Rating
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comment section */}
      <div class="bg-slate-400 flex justify-around p-5 items-center w-[calc(100%-5px)] sm:w-[80%] flex-wrap m-auto rounded-xl">
        <div>
          <h1 class="text-6xl m-0 p-4 text-slate-800 text-center">
            Leave Comment
          </h1>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            await axios({
              method: "POST",
              url: `http://localhost:3000/comment`,
              data: {
                body: target.description.value,
                productId: id(),
                rate: rating(),
              },
              headers: {
                authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }).then(() => {
              setShowMessage("thank you for your comment");
              setTimeout(() => {
                setShowMessage("");
              }, 8000);
            });
          }}
          class="flex flex-col"
        >
          <textarea
            class="p-4 text-base w-[80dvw] h-[100px] sm:w-[400px] sm:h-[180px]"
            name="description"
            id="description"
          ></textarea>
          <div>
            <For each={[1, 2, 3, 4, 5]}>
              {(number) => {
                let num = rating();
                return (
                  <>
                    <button
                      type="button"
                      onMouseOver={() => {
                        setRating(number);
                      }}
                      classList={{
                        "text-yellow-300": number <= rating(),
                        "text-white": number > rating(),
                      }}
                      class="text-3xl sm:text-5xl p-3"
                    >
                      &#9733;
                    </button>
                  </>
                );
              }}
            </For>
          </div>
          <button
            type="submit"
            class="transition-all hover:bg-green-700 hover:text-white text-center text-slate-800"
          >
            save
          </button>
        </form>
      </div>

      {/*       
      <div class="container mx-auto my-4">
        <hr class="border-t-2 border-gray-300" />
        <p class="text-3xl">Similar Products</p>
        <div class="md:flex md:space-x-6">
          <div class="md:w-1/4">
            <div class="similar-product">
              <img
                class="w-full"
                // src="https://source.unsplash.com/gsKdPcIyeGg"
                alt="Preview"
              />
              <p class="text-2xl title">Lovely black dress</p>
              <p class="text-2xl price">$100</p>
            </div>
          </div>
          <div class="md:w-1/4">
            <div class="similar-product">
              <img
                class="w-full"
                // src="https://source.unsplash.com/sg_gRhbYXhc"
                alt="Preview"
              />
              <p class="text-2xl title">Lovely Dress with patterns</p>
              <p class="text-2xl price">$85</p>
            </div>
          </div>
          <div class="md:w-1/4">
            <div class="similar-product">
              <img
                class="w-full"
                // src="https://source.unsplash.com/gJZQcirK8aw"
                alt="Preview"
              />
              <p class="text-2xl title">Lovely fashion dress</p>
              <p class="text-2xl price">$200</p>
            </div>
          </div>
          <div class="md:w-1/4">
            <div class="similar-product">
              <img
                class="w-full"
                // src="https://source.unsplash.com/qbB_Z2pXLEU"
                alt="Preview"
              />
              <p class="text-2xl title">Lovely red dress</p>
              <p class="text-2xl price">$120</p>
            </div>
          </div>
        </div>
      </div>   */}
      <Show when={showMessage()}>
        <Message
          msg={showMessage()}
          handleClick={() => {
            setShowMessage("");
          }}
        />
      </Show>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Product;
