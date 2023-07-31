<template>
  <section id="learning-milestones">
    <div
      class="milestone-container"
      v-for="course in milestones"
      :key="course.course"
    >
      <milestone-item
        :cid="course.course"
        :completed="course.completed"
      ></milestone-item>
    </div>
  </section>
</template>

<script>
import milestoneItemVue from "@/components/milestone-item.vue";
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
      milestones: [],
    };
  },
  created: function () {
    this.fetchLearningMilestones();
  },
  computed: {},
  methods: {
    fetchLearningMilestones: function () {
      let url = `${this.$store.state.apiServer}/fetch-learning-milestones/`;
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.milestones = reverseArray(response.data.milestones);
            console.log(this.milestones);
          } else {
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
  },
  components: {
    milestoneItem: milestoneItemVue,
  },
};
</script>

<style lang="scss"></style>
