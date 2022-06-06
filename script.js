const app = {
    data(){
        return {
            counter: 0
        }
    },
    methods:{
        inc(){
            this.counter++;
        },
        dec(){
            this.counter--;
        }
    }
}

Vue.createApp(app).mount('#app');

