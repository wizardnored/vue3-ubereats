<template>
  <div class="restaurant--row">
    <h2 class="title">Nos restaurants</h2>
    <div class="wrapper--card">
      <RouterLink
        class="restaurant--wrapper"
        v-for="(restaurant, index) in threeRestaurants"
        :key="index"
        :to="{ name: 'Restaurant', params: { name: restaurant.name } }"
      >
        <RestaurantCard :infoRestaurant="restaurant" />
      </RouterLink>
    </div>
  </div>
</template>

<script>
import RestaurantCard from "./RestaurantCard.vue";
export default {
  name: "RestaurantRow",
  components: {
    RestaurantCard,
  },
  props: {
    threeRestaurants: Array,
  },
};
</script>

<style lang="scss">
.restaurant--row {
  .restaurant--wrapper {
    width: 33%;
  }
  .title {
    font-size: 2rem;
  }
  .wrapper--card {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
