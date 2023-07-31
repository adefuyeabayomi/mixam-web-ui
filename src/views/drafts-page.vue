<template>
  <!--design the post blah blah here.-->
  <div id="draft">
    <div class="draft-page-header">
      <p class="dph-title">My Drafts</p>
      <p class="dph-header-follow">Draft content you created.</p>
    </div>
    <div class="drafts-filter-container">
      <div class="draft-desc-container">
        <p>Filters :</p>
      </div>
      <div>
        <div class="draft-filters">
          <div>
            <vs-dropdown>
              <a class="a-icon" href="#">
                <div class="draft-item">
                  <span class="pointercursor"
                    ><span class="d-filter-main">Duration :</span>
                    {{ duration }} <i class="fas fa-caret-down"></i
                  ></span>
                </div>
              </a>
              <vs-dropdown-menu>
                <vs-dropdown-item>
                  <span class="dd-cc" @click="changeDuration(1)">1 Week</span>
                </vs-dropdown-item>
                <vs-dropdown-item divider>
                  <span class="dd-cc" divider @click="changeDuration(2)"
                    >2 Weeks</span
                  >
                </vs-dropdown-item>
                <vs-dropdown-item divider>
                  <span class="dd-cc" @click="changeDuration(4)">4 Weeks</span>
                </vs-dropdown-item>
                <vs-dropdown-item divider>
                  <span class="dd-cc" @click="changeDuration(5)"
                    >Over 4 Weeks</span
                  >
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
          <div>
            <vs-dropdown class="dd-cc">
              <a class="a-icon" href="#">
                <div class="draft-item">
                  <span class="pointercursor"
                    ><span class="d-filter-main">Published Status :</span>
                    {{ pStatus }} <i class="fas fa-caret-down"></i
                  ></span>
                </div>
              </a>
              <vs-dropdown-menu>
                <vs-dropdown-item>
                  <span class="dd-cc" @click="changePS('all')"
                    >Published & Unpublished</span
                  >
                </vs-dropdown-item>
                <vs-dropdown-item divider>
                  <span class="dd-cc" @click="changePS('published')"
                    >Only Published</span
                  >
                </vs-dropdown-item>
                <vs-dropdown-item divider>
                  <span class="dd-cc" @click="changePS('unpublished')"
                    >Only UnPublished</span
                  >
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
          <div>
            <vs-dropdown class="dd-cc">
              <a class="a-icon" href="#">
                <div class="draft-item">
                  <span class="pointercursor"
                    ><span class="d-filter-main">Draft Type :</span>
                    {{ dType }} <i class="fas fa-caret-down"></i
                  ></span>
                </div>
              </a>
              <vs-dropdown-menu>
                <vs-dropdown-item>
                  <span class="dd-cc" @click="changeDT('all')">All</span>
                </vs-dropdown-item>
                <vs-dropdown-item divider>
                  <span class="dd-cc" @click="changeDT('article')"
                    >Only Articles</span
                  >
                </vs-dropdown-item>
                <vs-dropdown-item divider>
                  <span class="dd-cc" @click="changeDT('course')"
                    >Only Courses</span
                  >
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="drafts-items" v-for="draft in drafts" :key="draft.created">
      <drafts-item v-bind="draft"></drafts-item>
    </div>
    <div class="draft-page-footer">
      <p>That's All the drafts here!</p>
    </div>
  </div>
</template>

<script>
function reverseArray(arr) {
  let returnArr = [];
  for (let count = arr.length - 1; count >= 0; count--) {
    returnArr.push(arr[count]);
  }
  return returnArr;
}
function RetroArray(theDate, range) {
  let dateArr = theDate.split(" ");
  let day = dateArr[0];
  let month = dateArr[1];
  let date = Number(dateArr[2]);
  let year = Number(dateArr[3]);
  let retArr = [theDate];
  let currentDay = dateArr.join(" ");
  for (let count = 0; count <= range; count++) {
    if (date == 1) {
      switch (month) {
        case "Jan": {
          month = "Dec";
          date = 31;
          year--;
          break;
        }
        case "Feb": {
          month = "Jan";
          date = 31;
          break;
        }
        case "Mar": {
          month = "Feb";
          date = 28;
          break;
        }
        case "Apr": {
          month = "Mar";
          date = 31;
          break;
        }
        case "May": {
          month = "Apr";
          date = 30;
          break;
        }
        case "Jun": {
          month = "May";
          date = 31;
          break;
        }
        case "Jul": {
          month = "Jun";
          date = 30;
          break;
        }
        case "Aug": {
          month = "Jul";
          date = 31;
          break;
        }
        case "Sep": {
          month = "Aug";
          date = 31;
          break;
        }
        case "Oct": {
          month = "Sep";
          date = 30;
          break;
        }
        case "Nov": {
          month = "Oct";
          date = 31;
          break;
        }
        case "Dec": {
          month = "Nov";
          date = 30;
          break;
        }
      }
    } else {
      date--;
    }
    switch (day) {
      case "Mon": {
        day = "Sun";
        break;
      }
      case "Tue": {
        day = "Mon";
        break;
      }
      case "Wed": {
        day = "Tue";
        break;
      }
      case "Thu": {
        day = "Wed";
        break;
      }
      case "Fri": {
        day = "Thu";
        break;
      }
      case "Sat": {
        day = "Fri";
        break;
      }
      case "Sun": {
        day = "Sat";
        break;
      }
    }
    let theDate = [day, month, date, year];
    theDate = theDate.join(" ");
    retArr.unshift(theDate);
  }
  return retArr;
}
import draftsItemVue from "@/components/drafts-item.vue";
export default {
  data: function () {
    return {
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      draftsMain: [],
      filterDuration: 1,
      publishedStatus: "all",
      draftType: "all",
    };
  },
  computed: {
    duration: function () {
      if (this.filterDuration == 1) {
        return "One Week";
      } else if (this.filterDuration == 2) {
        return "Two Weeks";
      } else if (this.filterDuration == 4) {
        return "One Month";
      } else {
        return "Over One Month";
      }
    },
    dType: function () {
      if (this.draftType == "article") {
        return "Only Articles";
      } else if (this.draftType == "course") {
        return "Only Courses";
      } else {
        return "All";
      }
    },
    pStatus: function () {
      if (this.publishedStatus == "published") {
        return "Only Published";
      } else if (this.publishedStatus == "unpublished") {
        return "Only Unpublished";
      } else {
        return "All";
      }
    },
    drafts: function () {
      let sortedDrafts = [];
      let date = String(new Date()).split(" ").slice(0, 4).join(" ");
      // sort for duration.
      let dateRetArr;
      if (this.filterDuration == 1) {
        dateRetArr = RetroArray(date, 5);
      } else if (this.filterDuration == 2) {
        dateRetArr = RetroArray(date, 12);
      } else if (this.filterDuration == 4) {
        dateRetArr = RetroArray(date, 28);
      }
      if (!dateRetArr) {
        sortedDrafts = this.draftsMain;
      } else {
        let ss1 = [];
        this.draftsMain.forEach((x) => {
          let theDate = String(new Date(x.created))
            .split(" ")
            .slice(0, 4)
            .join(" ");
          console.log(theDate);
          dateRetArr.includes(theDate) ? ss1.push(x) : false;
        });
        sortedDrafts = ss1;
      }
      // sort for published or unpublished
      if (this.publishedStatus == "published") {
        let ps1 = [];
        sortedDrafts.forEach((x) => {
          x.published ? ps1.push(x) : false;
        });
        sortedDrafts = ps1;
      } else if (this.publishedStatus == "unpublished") {
        let ps1 = [];
        sortedDrafts.forEach((x) => {
          !x.published ? ps1.push(x) : false;
        });
        sortedDrafts = ps1;
      }
      // sort for article-type
      if (this.draftType == "article") {
        let dt1 = [];
        sortedDrafts.forEach((x) => {
          x.type == "article" ? dt1.push(x) : false;
        });
        sortedDrafts = dt1;
      } else if (this.draftType == "course") {
        let dt1 = [];
        sortedDrafts.forEach((x) => {
          x.type == "course" ? dt1.push(x) : false;
        });
        sortedDrafts = dt1;
      }
      return reverseArray(sortedDrafts);
    },
  },
  methods: {
    fetchDrafts: function () {
      let url = `${this.$store.state.apiServer}/fetch-drafts/`;
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.draftsMain = response.data.drafts;
          } else {
            console.log("unable to fetch drafts");
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
    changeDuration(val) {
      this.filterDuration = val;
    },
    changePS(val) {
      this.publishedStatus = val;
    },
    changeDT(val) {
      this.draftType = val;
    },
  },
  components: {
    draftsItem: draftsItemVue,
  },
  created: function () {
    this.fetchDrafts();
  },
};
</script>

<style lang="scss">
#draft {
  padding-bottom: 70px;
}
.draft-page-header {
  text-align: center;
  padding-top: 50px;
  font-family: candara, signika-regular;
}
.dph-header-follow {
  font-size: 120%;
}
.dph-title {
  font-weight: 600;
  font-size: 200%;
}
.drafts-filter-container {
  padding: 10px;
}
.draft-desc-container {
  width: max-content;
  margin-bottom: 10px;
}
.draft-desc-container p {
  width: max-content;
  font-weight: 600;
}
.draft-item {
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #6da8ff;
  width: max-content;
  margin-bottom: 15px;
  background: #cbe0ff;
  color: rgb(38, 38, 38) !important;
}
.drafts-items {
  padding: 10px;
}
.draft-page-footer {
  text-align: center;
}
.d-filter-main {
  font-weight: 600;
}
.dd-cc {
  width: max-content !important;
}
</style>
