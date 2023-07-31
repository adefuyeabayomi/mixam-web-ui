<template>
  <section id="component-id">
    <div v-for="course in savedCourses" :key="course.cid">
      <saved-course-item :cid="course.cid"></saved-course-item>
    </div>
    <div class="no-more-saved-courses">That's all the courses you saved!</div>
  </section>
</template>

<script>
import savedCourseItemVue from "@/components/saved-course-item.vue";
function reverseArray(arr) {
  let returnArr = [];
  for (let count = arr.length - 1; count >= 0; count--) {
    returnArr.push(arr[count]);
  }
  return returnArr;
}

export default {
  data: function () {
    return {
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      savedCourses: [],
    };
  },
  created: function () {
    this.fetchSavedCourses();
  },
  computed: {},
  methods: {
    fetchSavedCourses() {
      let url = `${this.$store.state.apiServer}/fetch-saved-courses/`;
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log("saved courses", response.data);
            this.savedCourses = reverseArray(response.data.savedCourses);
          } else {
          }
        })
        .catch((err) => {});
    },
  },
  components: {
    savedCourseItem: savedCourseItemVue,
  },
};
</script>

<style lang="scss">
.no-more-saved-courses {
  text-align: center;
  padding-top: 15px;
}
</style>
