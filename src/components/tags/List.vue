<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-for="tag in tags" class="my-5" router :to="'/posts/tags/' + tag.title">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ tag.title }}</h3>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

	const axios = require('axios');
	const serverDomain = "http://localhost:8000";
	
	export default {
		data() {
			return {
				tags: [],
			}
		},

		mounted() {
			this.loadTags();
		},
		methods: {
			loadTags()
			{
				axios.get(serverDomain + '/api/tags')
				.then( response => {
					this.tags = response.data;
				})
				.catch(err => {
				});
			},

		}
	}
</script>