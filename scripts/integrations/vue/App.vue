<template>
	<div id="app">
		<nav>
			<ul>
				<li><router-link to="/">Editor Types</router-link></li>
				<li><router-link to="/configuration">Events and Directives</router-link></li>
				<li><router-link to="/2-way-binding">Two-way Data Binding</router-link></li>
			</ul>
		</nav>

		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app'
}
</script>

<style scoped>
ul {
	display: block;
	width: 100%;
	list-style-type: none;
	margin: 0;
	padding: 0;
}

li {
	display: inline-block;
	width: 33%;
}

a {
	display: block;
	position: relative;
	padding: 10px 15px;
	border: 1px solid #3e59ad;
	margin-right: 1%;
	text-align: center;
	transition: 250ms ease background;
	text-decoration: none;
}

a.router-link-exact-active {
	font-weight: bold;
	background: hsla(225, 14%, 83%, 0.5);
	text-decoration: none;
}

a.router-link-exact-active:after {
	content: '';
	width: 100%;
	height: 3px;
	background: #3e59ad;
	position: absolute;
	bottom: 0;
	left: 0;
}

a:hover:not(.router-link-exact-active),
a:focus:not(.router-link-exact-active) {
	background: hsla(225, 14%, 83%, 0.3);
}

@media screen and (max-width: 768px) {
	li {
		width: 100%;
		margin-bottom: 5px;
	}
}
</style>
