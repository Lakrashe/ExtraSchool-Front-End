const { createApp } = Vue;

createApp({
    data() {
        return {
            // Define the initial state of the application
            showProducts: true,
            CheckoutMessage: false,
            subjects: {
                lesson: [
                    { id: 1, subject: "Math", location: "Hendon", price: "100£", availabilty : 5,img: "images/mathimg.png"},
                    { id: 2, subject: "English", location: "Wembley", price: "150£", availabilty : 5,img: "images/English.png"},
                    { id: 3, subject: "Art", location: "Camden", price: "30£", availabilty : 5,img: "images/Art.png"},
                ],
            },
            cart: [],
            order:{
                firstName: "",
                lastName: "",
                phone: "",
            }
        }
    },

     computed: {
        numberofItems : function(){
            return this.cart.length;
        },
        formIsValid: function() {
            // Check if all required fields are filled
            return this.order.firstName && this.order.lastName && this.order.phone;
        }
    },
    methods: {
        addToCart(id) {
            // Find the lesson with the matching id in the subjects.lesson array
            const lesson = this.subjects.lesson.find(l => l.id === id);
            // Add the selected lesson to the cart with the matching id
            this.cart.push(lesson);
            lesson.availabilty --;
        },
        canAddToCart(lesson) {
            // Check if the lesson has availability greater than 0
            return lesson.availabilty > 0;
        },
        showCheckout() {
            // Toggling the checkout paage
            this.showProducts = this.showProducts ? false : true;
        },
        showCheckoutMessage() {
            // Toggling the checkout message
            this.CheckoutMessage = this.CheckoutMessage ? false : true;
            this.cart = [];
        },
        removeFromCart(id) {
            // Find the index of the item in the cart with the matching id
            const index = this.cart.findIndex(item => item.id === id);
            //check if finindex could find the item in the cart 
            if (index >= 0) {
                // Remove the item from the cart
                this.cart.splice(index, 1);
                // Find the lesson with the matching id in the subjects.lesson array
                const lesson = this.subjects.lesson.find(l => l.id === id);
                // Increase the availability back of the lesson by 1
                lesson.availabilty++;
            }
        }
    }
}).mount("#app")