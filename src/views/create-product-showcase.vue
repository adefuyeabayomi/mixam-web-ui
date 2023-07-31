<template>
  <section id="create-product-showcase">
    <!--the post page accepts the users post params i.e post title,-->
    <div class="page-title-container">
      <p>Create Product Showcase</p>
    </div>
    <div class="page-desc-container">
      <p>
        <i class="fas fa-bulb"></i>A new tool to show your products in a a more
        appealing way to customers.
      </p>
    </div>
    <section>
      <form enctype="multipart/form-data" id="product-showcase-form">
        <div class="product_name">
          <p class="product_name">Product Name :</p>
          <input type="text" v-model="productname" />
        </div>
        <div class="product_cartegory">
          <p class="product_cartegory">Product Cartegory</p>
          <input
            type="text"
            placeholder="eg, child wears, wrist watch etc."
            v-model="productcartegory"
          />
        </div>
        <div class="product_features">
          <p>Product Features : (Two Required)</p>
          <div>
            <input type="text" v-model="productfeatures" />
            <button @click="openPrompt()" class="add_feature_button">
              Add Feature
            </button>
          </div>
        </div>
        <div>
          <p class="main_product_description">
            Describe your product briefly : (not more than 100 characters)
          </p>
          <!--product description-->
          <input
            type="text"
            class="product_description"
            v-model="productdecscription"
          />
        </div>
        <div class="product_image">
          <p>Upload an image of the product.</p>
          <input type="file" />
        </div>
        <div class="choose_background">
          <p>Choose background:</p>
          <select name="background" v-model="background">
            <option value="" selected>Select A Background</option>
            <option value="1">background1</option>
            <option value="2">background2</option>
            <option value="3">Background3</option>
            <option value="4">Background4</option>
            <option value="5">Background5</option>
            <option value="6">Background6</option>
          </select>
        </div>
        <div class="choose_theme">
          <p>Choose Theme:</p>
          <select name="theme" v-model="theme">
            <option value="" selected>Select a theme</option>
            <option value="theme1">Theme1</option>
            <option value="theme2">Theme2</option>
            <option value="theme3">Theme3</option>
            <option value="theme4">Theme4</option>
            <option value="theme5">Theme5</option>
          </select>
        </div>
      </form>
      <div class="functions">
        <div class="preview_container">
          <vs-button block>Preview</vs-button>
        </div>
        <div class="publish_container">
          <vs-button @click="validatePost()" block>Publish</vs-button>
        </div>
      </div>
    </section>
    <section id="preview_section">
      <p>This is the preview section</p>
    </section>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      productname: "",
      productcartegory: "",
      productdescription: "",
      productFeatures: [],
      productfeatures: "",
      theme: "",
      background: "",
    };
  },
  computed: {},
  methods: {
    validatePost() {
      //how to know if a form has been uploaded in an html file element
      //check to see if all the required input has been filled in and return true or notify the user.
      if (this.productname == "") {
        this.$modal.show("dialog", {
          title: "Product Name Missing",
          text: "Please a product name for your product showcase before you can proceed",
          buttons: [
            {
              title: "Okay",
              handler: () => {
                this.$modal.hide("dialog");
              },
            },
          ],
        });
      } else if (this.productcartegory == "") {
        this.$modal.show("dialog", {
          title: "Product Cartegory Missing",
          text: "Please add a cartegory for your product before you can proceed",
          buttons: [
            {
              title: "Okay",
              handler: () => {
                this.$modal.hide("dialog");
              },
            },
          ],
        });
      } else if (this.productdescription == "") {
        this.$modal.show("dialog", {
          title: "Product Decsciption Missing",
          text: "Please add a short description for your product before you can proceed",
          buttons: [
            {
              title: "Okay",
              handler: () => {
                this.$modal.hide("dialog");
              },
            },
          ],
        });
      } else if (this.productFeatures.length < 2) {
        this.$modal.show("dialog", {
          title:
            "Please add at least two product features before you can proceed",
          buttons: [
            {
              title: "Okay",
              handler: () => {
                this.$modal.hide("dialog");
              },
            },
          ],
        });
      } else if (this.theme == "") {
        this.$modal.show("dialog", {
          title: "No theme chosen",
          text: "Please choose a theme product showcase before you can proceed",
          buttons: [
            {
              title: "Okay",
              handler: () => {
                this.$modal.hide("dialog");
              },
            },
          ],
        });
      } else if (this.background == "") {
        this.$modal.show("dialog", {
          title: "No background chosen",
          text: "Please choose a background for your product showcase before you can proceed",
          buttons: [
            {
              title: "Okay",
              handler: () => {
                this.$modal.hide("dialog");
              },
            },
          ],
        });
      } // remains to validate that an image has been uploaded.
      else {
        console.log("product-showcase-valid");
        this.sendPublishRequest();
      }
    },
    sendPublishRequest() {
      let MID = window.localStorage.getItem("userlogindata").MID,
        DID = window.localStorage.getItem("userlogindata").DID;
      let productname = this.productname,
        productcartegory = this.productcartegory,
        productdecscription = this.productdecscription,
        productfeatures = this.productFeatures.join("-"),
        theme = this.theme,
        background = this.background;
      let formData = new FormData(
        document.getElementById("product-showcase-form")
      );
      formData.append(
        "params",
        JSON.stringify({
          MID,
          DID,
          productname,
          productcartegory,
          productdecscription,
          productfeatures,
          theme,
          background,
        })
      );
      // let url = "/publishproductshowcase/"
      let url = "http://localhost/publishproductshowcase/";
      window.axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log("response.data");
            this.$modal.show("dialog", {
              title: "done",
              text: "Your product showcase has been published",
              buttons: [
                {
                  title: "Okay",
                  handler: () => {
                    this.$modal.hide("dialog");
                  },
                },
              ],
            });
            this.$router.push("create-main");
          } else {
            this.$modal.show("dialog", {
              title: "Server Error",
              text: "Your showcase has not been published",
              buttons: [
                {
                  title: "Okay",
                  handler: () => {
                    this.$modal.hide("dialog");
                  },
                },
              ],
            });
          }
        })
        .catch((error) => {
          this.$modal.show("dialog", {
            title: "Something Went Wrong",
            text: error.message,
            buttons: [
              {
                title: "Okay",
                handler: () => {
                  this.$modal.hide("dialog");
                },
              },
            ],
          });
        });
    },
  },
};
</script>

<style lang="scss"></style>
