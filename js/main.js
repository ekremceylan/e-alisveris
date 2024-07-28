const productList = document.getElementById("productList")
const cartItemsElement = document.getElementById("cartItems")
const cartTotalElement=document.getElementById("cartTotal")
let menu=document.querySelector(".navbar")
let menuIcon=document.querySelector("#menu-icon")
console.log(menuIcon)
menuIcon.addEventListener("click",()=>menu.classList.toggle("open-menu"))


let cart = JSON.parse(localStorage.getItem("cart")) || [];
//urunler
const products = [
  {
    id: 1,
    title: "Autumn Hoodie",
    price: 264.90,
    image: "https://pangaia.com/cdn/shop/products/Recycled-Nylon-NW-Flwrdwn-Quilted-Collarless-Jacket-Cerulean-Blue-Female-1_bf4b2a54-8a7f-4174-bc49-8ef22b24bfdd.jpg?v=1666708230&width=1426"
  },
  {
    id: 2,
    title: "FUSION HOODIE",
    price: 295,
    image:"https://images.undiz.com/on/demandware.static/-/Sites-ZLIN-master/default/dw2264d914/merch/BTS/654206666_x.jpg?sw=1250",
  },
  {
    id: 3,
    title: "Chestnut Brown",
    price: 74.9,
    image:"https://pangaia.com/cdn/shop/products/Recycled-Cashmere-Core-Hoodie-Chestnut-Brown-Male-1.jpg?v=1663947464&width=1426",
  },
  {
    id: 4,
    title: "Nike Sportswear",
    price: 80,
    image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40f3-9b95-c7500939150a/sportswear-club-mens-french-terry-crew-neck-sweatshirt-tdFDRc.png",
  },
  {
    id: 5,
    title: "Champion BASIC",
    price: 48.99,
    image:"https://img01.ztat.net/article/spp-media-p1/7067458719b744fe81ffee62d3d0b912/abad421e7d8e47f08a2abc1c6ffe07dc.jpg?imwidth=1800",
  },
  {
    id: 6,
    title: "Cotton Hoodie",
    price: 395,
    image:"https://pangaia.com/cdn/shop/files/Reclaim-3.0-Hoodie-Reclaim-Jade-Womens-3.jpg?v=1693398673&width=1426",
  },
  {
    id: 7,
    title: "CLASSIC CREWNECK",
    price: 48.99,
    image:"https://img01.ztat.net/article/spp-media-p1/10cea44041564f81ac585fc6c8978907/c4c32dbc45dd4dbc9d15087c846538f2.jpg?imwidth=1800",
  },
  {
    id: 8,
    title: "TAPE HOODED",
    price: 79.99,
    image:"https://img01.ztat.net/article/spp-media-p1/d391f90be278469ebfdff731800cfccc/6d2101bd672f4e059501f01fe726f315.jpg?imwidth=1800",
  },
]
//urunleri ekrana ya<dıracak fonksiyon
function renderProducts() {
  productList.innerHTML = products.map((product) =>
    `
        <div class="product">
            <img src="${product.image}" style="width:245px ; height:327px">
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-price"> $${product.price}</p>
                <a class="add-to-cart" data-id="${product.id}">Add to Cart</a>
            </div>
        </div>
        `
  ).join("")
  const addToCartButtons = document.getElementsByClassName("add-to-cart")
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i]
    addToCartButton.addEventListener("click", addToCart)
  }


}

//sepete ekleme islemi
function addToCart(event) {
  //sepete ekle butonuna bastıgımızda urunun ıd sine ulasma
  const productID = parseInt(event.target.dataset.id)
  //Dizinin içerisinden tıkladıgımız ıd li elemanı bulmak icin find metodunu kullandık
  const product = products.find((product) => product.id === productID)


  if (product) {
    //Sepette tıkladıgımız urun önceden var mı yok mu kontrol ederiz
    const exixtingItem = cart.find((item) => item.id === productID);
    //Sepette tıkladıgımız urun varsa bu ürünün miktarını arttırırız
    if (exixtingItem) {
      exixtingItem.quantity++;
    }
    else {
      //tıkladıgımız ürün sepette yoksa yeni bir ürün olarak ekleriz
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      }
      //event.target.textContent="Added"
      //yeni olusturdugumuz ürünü kart dizisine ekleriz
      cart.push(cartItem)
      
    }
    event.target.textContent="Added"
    //toplam miktarı günceller
    updateCartIcon()
    saveToLocalStorage()
    renderCartItems()
    calculateCartTotal()
  }
}
function removeFromCart(event){
  const productID=parseInt(event.target.dataset.id)
  console.log(cart)
  //CART DİZİSİNDEN SİLMEK İSTEDİGİMİZ URUNU İD SİNE GÖRE SİLDİK
  cart=cart.filter((item)=>item.id!==productID)
  console.log(cart)
  //localstorage i güncelledik
  saveToLocalStorage()
  //sayfayı güncelledik
  renderCartItems()
  calculateCartTotal()
  updateCartIcon()
}
//İNPUTUN İÇERİSİNDEKİ MİKTAR DEGİSİNCE CALISACAK FONKSİYON
function changeQuantity(event){
  const productID=parseInt(event.target.dataset.id)
  const quantity=parseInt(event.target.value)
  if(quantity>0){
    const cartItem=cart.find((item=>item.id===productID))
    if(cartItem){
      cartItem.quantity=quantity;
      saveToLocalStorage()
      calculateCartTotal()
      updateCartIcon()
    }
  }

}

//localStorage e veri eklemek için kullandık
function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart))
}



function renderCartItems() {

  cartItemsElement.innerHTML = cart.map((item) =>

    `
     <div class="cart-item">
       <img src="${item.image}" alt="${item.title}">
          <div class="cart-item info">
               <h2 class="cart-item-title">${item.title}</h2>
               <input type="number" min="1" value="${item.quantity}" class="cart-item-quantity" data-id="${item.id}">
           </div>
           <h2 class="cart-item-price">${item.price}</h2>
           <button class="remove-from-cart" data-id="${item.id}">Remove</button>
                        
     </div>
     `
  ).join("")
  const removeButtons = document.getElementsByClassName("remove-from-cart")
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton=removeButtons[i]
    removeButton.addEventListener("click",removeFromCart)

  }
const quantityInputs=  document.getElementsByClassName("cart-item-quantity")

for(let i=0;i<quantityInputs.length;i++){
  const quantityInput=quantityInputs[i]
  quantityInput.addEventListener("change",changeQuantity)
}
updateCartIcon()
}

//sepetteki toplam fiyatı hesaplar
function calculateCartTotal(){
  //reduce iki değer ister birincisi yapacagımız işlem diğeri ise baslangıc degeri
  const total=cart.reduce((sum,item)=>sum + item.price * item.quantity,0);
  cartTotalElement.textContent=`Total:${total.toFixed(2)}`
}


//sayfa cart.html sayfasındaysa renderCartItems fonksiyonu calısması gerekiyor
if (window.location.pathname.includes("cart.html")) {
  renderCartItems()
  calculateCartTotal()

}//sayfa index.html sayfasındaysa renderProducts fonksiyonu çalısması gerekiyor
else {
  renderProducts()
}




function updateCartIcon(){
  const cartIcon=document.getElementById("cart-icon")
  const i=document.querySelector(".bx-shopping-bag")
  let totalQuantity=cart.reduce((sum,item)=>sum + item.quantity,0)
  i.setAttribute("data-quantity",totalQuantity)
  if(cart.length===0){
    totalQuantity=0
  }
  cartIcon.setAttribute("data-quantity",totalQuantity)
}
updateCartIcon()

function updateCartIconOnCartChange(){
  updateCartIcon()
}
window.addEventListener("storage",updateCartIconOnCartChange)

renderProducts()
renderCartItems()
calculateCartTotal()