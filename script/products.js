let products = document.querySelector(".products");
fetch("/products.json").then((success) => {
  let result = success.json();
  result.then((data) => {
    //The initial category equals the first product category
    let categ = data[0]["category"];
    //creating category header
    let category = create_category(data, 0);
    products.appendChild(category);
    let category_container = document.createElement("div");
    category_container.classList.add("p-category");

    /////// looping on the products from the data ///////
    for (let i = 0; i < data.length; i++) {
      let product = document.createElement("div");
      let product_img = document.createElement("img");
      let brand_name = document.createElement("p");
      let price = document.createElement("p");
      let old_price = document.createElement("s");

      //creating the main elements
      product.classList.add("product");
      product_img.classList.add("product-img");
      product_img.src = data[i]["p-image"];
      brand_name.classList.add("brand-name");
      brand_name.innerText = data[i]["brand"];
      old_price.innerText = data[i]["old-price"];
      price.classList.add("price");
      price.appendChild(old_price);
      price.innerHTML = `${price.innerHTML} ${data[i]["current-price"]}`;

      product.appendChild(product_img);
      product.appendChild(brand_name);
      product.appendChild(price);

      // append the product in the category container if it is the same
      if (data[i]["category"] == categ) {
        category_container.appendChild(product);
        category_container.appendChild(product);
        //create new category container and append the finished one
      } else if (data[i]["category"] !== categ) {
        categ = data[i]["category"];
        products.appendChild(category_container);
        category_container = document.createElement("div");
        category_container.classList.add("p-category");
        category_container.appendChild(product);
        category = create_category(data, i);
        products.appendChild(category);
      }
      if (i === data.length - 1) {
        products.appendChild(category_container);
      }
    }
  });
});
function create_category(data, i) {
  let category = document.createElement("div");
  category.classList.add("category-title");
  let category_name = document.createElement("p");
  category_name.id = data[i]["category"];
  category_name.innerText = data[i]["category"];
  category.appendChild(category_name);
  return category;
}
