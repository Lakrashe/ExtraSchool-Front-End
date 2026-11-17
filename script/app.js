const { createApp } = Vue;
const Base_Url = "https://m01039583-server.onrender.com"
createApp({
    data() {
        return {
            // Define the initial state of the application
            showProducts: true,
            CheckoutMessage: false,
            decreasing: false,
            sortType: "price",
            subjects: {
                lesson: [],
            },
            cart: [],
            order: {
                firstName: "",
                lastName: "",
                phone: "",
            }
        }
    },

    computed: {
        numberofItems: function () {
            return this.cart.length;
        },
        formIsValid: function () {
            // Check if all required fields are filled
            return this.order.firstName && this.order.lastName && this.order.phone;
        },
        sortedLessons: function () {
            let type = this.sortType
            //Create sorted variable so that we can reverse it 
            let sorted = this.subjects.lesson.sort(function (a, b) {
                //if the type is not numeric
                if (type === "subject" || type === "location") {
                    return a[type].localeCompare(b[type]);
                }
                //for numeric type
                else {
                    return a[type] - b[type];
                }
            });
            //reverse so that if button increase dec clicked it reverse the sorted list
            return this.decreasing ? sorted : sorted.reverse();
        },
    },
    created() {
        this.fetchData();
    },
    methods: {
        //Async function that fetch data temporarly from my local host
        async fetchData() {
            const url = Base_Url + "/lesson";
            let response = await (fetch(url));
            this.subjects.lesson = await response.json();
        },
        //Async function to post order in the server
        async postOrder() {
            const url = Base_Url + "/orders";
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //Wrap order and cart in one object
                body: JSON.stringify({
                    order: this.order,
                    cart: this.cart.map(item => item.id),
                })
            };
            let response = await (fetch(url, options));

            for (let lesson of this.cart) {
                await this.updateLesson(lesson);
            }
            this.showCheckoutMessage();
        },
        //img address
        imageAdress(lesson) {
            return Base_Url + "/" + lesson.img;
        },
        addToCart(id) {
            // Find the lesson with the matching id in the subjects.lesson array
            const lesson = this.subjects.lesson.find(l => l.id === id);
            // Add the selected lesson to the cart with the matching id
            this.cart.push(lesson);
            lesson.availabilty--;
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
            this.showProducts = true;
            //Clear the form 
            this.order.firstName = "";
            this.order.lastName = "";
            this.order.phone = "";
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
        },
        //Update lesson
        async updateLesson(lesson) {
            const url = Base_Url + "/lesson/" + lesson._id;
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ availabilty: lesson.availabilty })
            }
            let response = await (fetch(url, options));
        },

    }
}).mount("#app")