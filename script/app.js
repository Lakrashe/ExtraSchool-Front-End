const { createApp } = Vue;

createApp({
    data() {
        return {
            // Define the initial state of the application
            showProducts: true,
            subjects: {
                lesson: [
                    { id: 1, subject: "Math", location: "Hendon", price: "100£", availabilty : 5,img: "images/mathimg.png"},
                    { id: 2, subject: "English", location: "Wembley", price: "150£", availabilty : 5,img: "images/English.png"},
                    { id: 3, subject: "Art", location: "Camden", price: "30£", availabilty : 5,img: "images/Art.png"}
                ],
            },
            cart: []
        }
    },

     computed: {
        numberofItems : function(){
            return this.cart.length;
        },
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
        }
    },
   
}).mount("#app")