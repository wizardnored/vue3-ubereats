<template>
  <div class="home">
    <div class="header">
      <img
        src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg"
        alt=""
        srcset=""
      />
      <div class="wrapper--input">
        <input
          v-model="userSearchRestaurant"
          type="text"
          placeholder="De quoi avez vous envie?"
        />
        <div class="search">
          <RouterLink
            v-for="(restaurant, i) in searchRestaurant"
            :key="i"
            :to="{ name: 'Restaurant', params: { name: restaurant.name } }"
          >
            <div class="container--restaurant--search">
              <div class="wrapper--img">
                <img :src="restaurant.image" alt="" />
              </div>
              <p>{{ restaurant.name }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
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
import { onMounted, ref, watch } from "vue";
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
    let allRestaurants = [];

    const makeDataRestaurant = () => {
      let threeRestaurants = [];
      for (const restaurant of BDD) {
        const newRestaurant = new Restaurant(
          restaurant.name,
          restaurant.note,
          restaurant.image,
          restaurant.drive_time
        );

        allRestaurants.push(newRestaurant);

        if (threeRestaurants.length === 2) {
          threeRestaurants.push(newRestaurant);
          restaurants.value.push(threeRestaurants);
          threeRestaurants = [];
        } else {
          threeRestaurants.push(newRestaurant);
        }
      }
    };

    //user seach restaurant
    let userSearchRestaurant = ref("");
    let searchRestaurant = ref([]);

    watch(userSearchRestaurant, (newValue) => {
      let regex = RegExp(newValue.toLowerCase());

      let newSearchRestaurant = allRestaurants.filter((restau) =>
        regex.test(restau.name.toLowerCase())
      );

      newValue == 0
        ? (searchRestaurant.value = [])
        : (searchRestaurant.value = newSearchRestaurant);
    });

    onMounted(makeDataRestaurant);

    return { restaurants, userSearchRestaurant, searchRestaurant };
  },
};
</script>

<style lang="scss">
.home {
  .header {
    height: 120px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 200px;
    }

    .wrapper--input {
      position: relative;
      input {
        background-color: #f6f6f6;
        border: none;
        height: 60px;
        width: 400px;
        outline: none;
        padding-left: 20px;
      }
      .search {
        position: absolute;
        top: 100%;
        width: 100%;
        background-color: #ffffff;
        .container--restaurant--search {
          display: flex;
          align-items: center;
          padding: 10px;

          &:hover {
            background-color: #f6f6f6;
          }
          .wrapper--img {
            height: 60px;
            width: 60px;
            margin-right: 25px;
            border-radius: 50%;
            overflow: hidden;
            img {
              height: 100%;
              width: auto;
            }
          }
        }
      }
    }
  }
  .banner {
    height: 200px;
    width: 100%;
    background-image: url("https://techcrunch.com/wp-content/uploads/2019/04/uber-eats-icon-ios.jpg");
    background-size: cover;
    background-position: center center;
  }
}
</style>
