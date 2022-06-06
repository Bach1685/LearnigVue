const app = {
    data(){
        return {
            placeHolder: '1',
            posts: [],
            currentId: 0,
        }
    },
    methods:{
        add(){
            this.posts.push({id: this.currentId, value: this.placeHolder});
            this.currentId++;
        },
        remove(_id){
            let index = this.posts.findIndex((post) => post.id === _id)
            this.posts.splice(index, 1);
        },
    }
}

Vue.createApp(app).mount('#app');

