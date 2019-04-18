<template>
	<v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile v-for="item in listItems" router :to="item.route">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
	export default {
		props: ['drawer'],
		
		data() {
			return {
				listItems: [
					{title: "Home", icon: "home", route: '/'},
					{title: "All Posts", icon: "home", route: '/posts'},
					{title: "Create Post", icon: "home", route: '/posts/create'},
					{title: "All Tags", icon: "home", route: '/tags'},
				]
			}
		}
	}
</script>