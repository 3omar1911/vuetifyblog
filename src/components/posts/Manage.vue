<template>
	
	<form>
	    <v-text-field
	      v-model="title"
		  name="post_title"
	      v-validate="'required'"
	      :error-messages="errors.first('title')"
	      label="Title"
	      data-vv-name="title"
	    ></v-text-field>
	    <v-textarea
	      v-model="desc"
	      name="post_desc"
	      label="Description"
	      v-validate="'required'"
	      :error-messages="errors.first('description')"
	      data-vv-name="description"
	    >
	    </v-textarea>
	    <v-btn @click.prevent="submitPost">submit</v-btn>
  </form>
</template>

<script>

	const axios = require('axios');
	const serverDomain = "http://localhost:8000";
	
	export default {

		data() 
		{
        	return {
            	title: null,      
            	desc: null,
            	action: 'create'
        	}
    	},

    	mounted()
    	{
    		if(typeof this.$route.params.id == 'undefined') {
    			return;
    		}

    		this.action = 'edit';
    		this.getCurrentPostData(this.$route.params.id);
    	},

		methods: {

			getCurrentPostData(postId)
			{
				axios.get(serverDomain + '/api/posts/data/'+ postId)
				.then(response => {
					console.log(response);
					this.title = response.data.post.title;
					this.desc = response.data.post.description;
				});
			},

			submitPost() 
			{
				this.$validator.validate().then(valid => {
					if(!valid) {
						return;
					}
					
			        if (valid && this.action == 'create' ) {
						this.storePost();
			        } else {
			        	this.updatePost();
			        }
		      	});
			},
			storePost()
			{
				axios.post(serverDomain + '/api/posts', {
					title: this.title,
					desc: this.desc,
				}).then(response => {
					this.$router.push({name: 'posts.index'});
				}).catch(err => {
					console.log(err.response);
				})
			},
			updatePost()
			{
				axios.put(serverDomain + '/api/posts/' + this.$route.params.id, {
					title: this.title,
					desc: this.desc,
				})
				.then(response => {
					this.$router.push({name: 'posts.index'});
				})
				.catch(err => {
					console.log(err.response);
				});
			}
		},
	}
</script>