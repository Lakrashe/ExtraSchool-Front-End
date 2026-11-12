const { createApp } = Vue;

createApp({
    data() {
        return{

            subjects:{
                math:{
                    title:"Math",
                    location: "Hendon",
                    price: "100£",
                    img:"images/mathimg.png"
                }
            }
        }
    }
}).mount("#app")