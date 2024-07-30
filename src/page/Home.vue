<template>
  <div class="home">
    <div class="header">
      <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" alt="" srcset="">
      <input type="text" placeholder="De quoi avez vous envie?">
    </div>
    <div class="banner"></div>
    <RestaurantRow
      v-for="(data, i) in restaurants"
      :key="i"
      :threeRestaurants="data"
    />
  </div>
</template>

<script>
//IMPORT
import BDD from "../BDD";
import { onMounted, ref } from "vue";
//COMPONENTS
import RestaurantRow from "@/components/RestaurantRow.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    RestaurantRow,
  },
  setup() {
    class Restaurant {
      constructor(name, note, image, drive_time) {
        this.name = name;
        this.note = note;
        this.image = image;
        this.drive_time = drive_time;
      }
    }

    let restaurants = ref([]);

    const makeDataRestaurant = () => {
      let threeRestaurants = [];
      for (const restaurant of BDD) {
        const newRestaurant = new Restaurant(
          restaurant.name,
          restaurant.note,
          restaurant.image,
          restaurant.drive_time
        );
        if (threeRestaurants.length === 2) {
          threeRestaurants.push(newRestaurant);
          restaurants.value.push(threeRestaurants);
          threeRestaurants = [];
        } else {
          threeRestaurants.push(newRestaurant);
        }
      }
    };

    onMounted(makeDataRestaurant);

    return { restaurants };
  },
};
</script>

<style lang="scss">
.home{
  .header{
    height: 120px;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
      width: 200px;
    }
    input{
      background-color: #f6f6f6;
      border: none;
      height: 60px;
      width: 400px;
      outline: none;
      padding-left: 20px;
    }
  }
  .banner{
    height: 200px;
    width: 100%;
    background-image: url("https://techcrunch.com/wp-content/uploads/2019/04/uber-eats-icon-ios.jpg");
    background-size: cover;
    background-position: center center;
  }
}
</style>
