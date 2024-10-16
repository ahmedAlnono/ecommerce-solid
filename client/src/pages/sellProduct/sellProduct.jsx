import { Show, createSignal } from "solid-js";
import "./sellProduct.css";
const SellProduct = () => {
  const [showErr, setShowErr] = createSignal(false);
  const [showSuccess, setShowSuccess] = createSignal(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.title.value);
    formData.append("description", e.target.description.value);
    const files = e.target.photos.files;
    for(let i = 0; i < files.length; i++){
      formData.append("photos", files[i]);
    }
    formData.append("price", `${e.target.price.value}$`);
    const type = e.target.type.value.split('#').map((ele)=>{
      return ele.trim();
    });
    type.shift();
    for(let i = 0; i < type.length; i++) {
      formData.append("type", type[i]);
    }
    formData.append("type", "global");
    try {
      const response = await fetch("http://localhost:3000/products/add", {
        method: "POST",
        body: formData,
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        setShowErr(true);
      } else {
        setShowSuccess(true);
      }
    } catch (error) {
      setShowErr(true);
      setTimeout(() => {
        setShowErr(false);
      }, 3000);
    }
  }

  return (
    <div class="sell-container" onSubmit={handleSubmit}>
      <form class="post-form">
        <h1>Create new Product</h1>
        <input type="text" name="title" placeholder="Title . . ." />
        <input type="text" name="type" placeholder="Types like #phones #cover"/>
        <input type="number" name="price" placeholder="Price per Dolar ..."/>
        <textarea
          name="description"
          cols={30}
          rows={2}
          placeholder="description"
        ></textarea>
        <label for="images" class="drop-container">
          <span class="drop-title hidden sm:block">Drop files here</span>
          <p class="hidden sm:block">or</p>
          <input
            type="file"
            multiple={true}
            id="images"
            accept="image/*"
            name="photos"
          />
        </label>
        <button type="submit">Save</button>
      </form>
      <Show when={showErr()}>
        <div class="alert">
          <h1 class="close">Post not created</h1>
          <button onClick={() => setShowErr(false)}>X</button>
        </div>
      </Show>
      <Show when={showSuccess()}>
        <div class="success">
          <h1>Post successfully created</h1>
          <button onClick={() => setShowSuccess(false)}>X</button>
          <br />
          <button>Show Profile</button>
        </div>
      </Show>
    </div>
  );
};

export default SellProduct;
