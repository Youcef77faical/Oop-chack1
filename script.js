//class for product
class Product{
             constructor(id,name,price){
                this.id = id;
                this.name = name;
                this.price = price;
             }
}
//class for shoppingcartitem
class Shoppingcartitem {
    constructor(product,quantity){
        this.product = product;
        this.quantity = quantity
    }

    gettotalprice(){
        return this.product.price * this.quantity
    }
}

class Shoppingcart{
    constructor(){
        this.items = [];
    }
    gettotal(){
        return this.items.reduce((total,item) => total + item.gettotalprice(),0)
    }
    addItem(product , quantity){
        const existingitem = this.items.find (item => item.Product.id === product.id)
        
        if(existingitem){
            existingitem.quantity += quantity
        }
        else{
            const newitem = new Shoppingcartitem(product, quantity);
            this.items.push(newitem);
        }
    }

    removeitem(productId){
        this.items = this.items.filter(item => item.product.id != productId)
    }
    desplayItems() {
        const cartItemslist =document.getElementById("cart-items");
        cartItemslist.innerHTML  =  " ";
        this.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.Product.name}- quantity: ${item.quantity} , totalprice: ${item.gettotalprice().tofixed(2)}`
            cartItemslist.appendChild(li);
        })
        this.updatetotalprice();

    }
    updatetotalprice(){
        const totalpriceElement = document.getElementById("total-price")
        totalpriceElement.textContent = `total: $${this.gettotal().tofixed(2)}`

    }
    

}

const cart = new Shoppingcart();

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function(){
        const productElement = this.parentElement;

        const id = parseInt(productElement.getAttriribute("data-id"))
        const name = productElement.getAttriribute("data-name")
        const price =parseFloat(productElement.getAttriribute("data-price"));

        const product = new product(id,name,price)
        cart.addItem(product, 1)
        cart.desplayItems();
    })
    
})
