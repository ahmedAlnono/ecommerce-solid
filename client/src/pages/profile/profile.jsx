import { useNavigate } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import axios from "axios";
import CardItem from "../../components/card1/CardItem";

const Profile = () => {
  const access_token = localStorage.getItem("access_token");
  const [products, setProducts] = createSignal([]);
  const [user, setUser] = createSignal();
  const navigate = useNavigate();
  axios({
    method: "GET",
    url: "http://localhost:3000/user/profile",
    headers: {
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then((res) => {
    console.log(res.data);
    setUser(res.data.products[0].userName);
    setProducts(res.data.products);
  });
  if (!access_token) {
    return (
      <>
        <div class="flex justify-center items-center flex-col">
          <h1 class="text-6xl text-green-400 text-center">
            you are not logged in
          </h1>
          <button
            class="bg-slate-700 text-green-100 p-3 rounded-lg"
            onClick={() => {
              navigate("/login");
            }}
          >
            login
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <h1 class="text-4xl text-center">Wellcome {user()}</h1>
      <h2 class="text-3xl text-center">Your Products</h2>
      <div class="grid-container">
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
      </div>
    </>
  );
};

export default Profile;

{
  /* <div class="mx-auto container md:w-[calc(100dvw-200px)]">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6   md:w-[calc(100dvw-200px)]">
    <div class="bg-white shadow rounded overflow-hidden  md:w-[calc(100dvw-200px)]">
      <div class="bg-gray-800 px-4 pt-4 pb-2 w-full">
        <div class="flex items-end pb-4">
          <div class="mr-3">
            <div class="text-white w-full">
              <h4 class="text-2xl mt-0 mb-0 text-center p-2">
                Manuella Tarly
              </h4>
            </div>
            <img
              src="https://images.pexels.com/photos/237697/pexels-photo-237697.jpeg"
              width="130"
              alt=""
            />
            <a
              href="#"
              class="bg-gray-800 text-white text-sm block py-1 px-2 rounded-full text-center"
            >
              Edit profile
            </a>
          </div>
        </div>
      </div>

      <div class="bg-gray-200 p-4 flex justify-end">
        <ul class="list-inline mb-0">
          <li class="list-inline-item">
            <h5 class="font-bold text-lg mb-0 block">241</h5>
            <small class="text-gray-600">
              {" "}
              <i class="fa fa-picture-o mr-1"></i>Photos
            </small>
          </li>
          <li class="list-inline-item">
            <h5 class="font-bold text-lg mb-0 block">84K</h5>
            <small class="text-gray-600">
              {" "}
              <i class="fa fa-user-circle-o mr-1"></i>Followers
            </small>
          </li>
        </ul>
      </div>

      <div class="py-4 px-4">
        <div class="flex items-center justify-between mb-3">
          <h5 class="text-xl mb-0">Recent photos</h5>
          <a href="#" class="text-gray-600">
            Show all
          </a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div class="mb-2 pr-2 md:pr-0">
            <img
              src="https://bootstrapious.com/i/snippets/sn-profile/img-3.jpg"
              alt=""
              class="w-full rounded shadow-sm"
            />
          </div>
          <div class="mb-2 pl-2 md:pl-0">
            <img
              src="https://bootstrapious.com/i/snippets/sn-profile/img-4.jpg"
              alt=""
              class="w-full rounded shadow-sm"
            />
          </div>
          <div class="mb-2 pr-2 md:pr-0">
            <img
              src="https://bootstrapious.com/i/snippets/sn-profile/img-5.jpg"
              alt=""
              class="w-full rounded shadow-sm"
            />
          </div>
          <div class="mb-2 pl-2 md:pl-0">
            <img
              src="https://bootstrapious.com/i/snippets/sn-profile/img-6.jpg"
              alt=""
              class="w-full rounded shadow-sm"
            />
          </div>
        </div>
        <div class="py-4">
          <h5 class="text-xl mb-3">Recent posts</h5>
          <div class="bg-gray-200 p-4 rounded shadow-sm">
            <p class="italic mb-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam.
            </p>
            <ul class="list-inline text-sm text-gray-600 mt-3 mb-0">
              <li class="list-inline-item">
                <i class="fa fa-comment-o mr-2"></i>12 Comments
              </li>
              <li class="list-inline-item">
                <i class="fa fa-heart-o mr-2"></i>200 Likes
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */
}
