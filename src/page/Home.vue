<template>
  <div class="home">
    <RestaurantRow />
  </div>
</template>

<script>
//IMPORT
import BDD from "../BDD";
import { onMounted } from "vue";
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

    let restaurants = [];

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
          restaurants.push(threeRestaurants);
          threeRestaurants = [];
        } else {
          threeRestaurants.push(newRestaurant);
        }
      }
    };

    onMounted(makeDataRestaurant);
  },
};
</script>

<style></style>
