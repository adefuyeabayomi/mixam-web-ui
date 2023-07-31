<template>
  <section id="component-id">
    <div v-for="course in myCourses" :key="course._id">
      <my-course-item
        :cid="course.cid"
        :completed="course.completed"
        :currentSection="Number(course.currentSection)"
        v-bind="course"
      ></my-course-item>
    </div>
  </section>
</template>

<script>
import myCourseItem from "../components/my-course-item.vue";
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
      myCourses: [],
    };
  },
  created: function () {
    this.fetchMyCourses();
  },
  computed: {},
  methods: {
    fetchMyCourses() {
      let url = "http://localhost/fetch-my-courses/";
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
            this.myCourses = reverseArray(response.data.myCourses);
          } else {
          }
        })
        .catch((err) => {});
    },
  },
  components: {
    myCourseItem,
  },
};
</script>

<style lang="scss"></style>
