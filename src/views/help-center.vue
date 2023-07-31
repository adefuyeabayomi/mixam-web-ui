<template>
  <section id="help-center-page-container">
    <div class="help-center-background-image-container">
      <img class="hcbi" src="../assets/4935872.jpg" />
      <div class="help-center-header-contents">
        <p class="help-center-header">
          Hi, How <span class="help-center-h-s">can we help?</span>
        </p>
        <p class="help-center-follow">
          All the cartegories have been put in place to provide all the
          necessary assistance you need.
          <span class="choose-option-hc">Choose an option</span> that best helps
          you get what you need.
        </p>
        <div class="help-center-genops-container">
          <div class="hci-cont">
            <div class="help-center-genops-item">
              <div class="hci-img-container">
                <div>
                  <img src="../assets/connect.png" />
                </div>
              </div>
              <div class="hci-content">
                <div>
                  <p class="hci-cont-title">Guides</p>
                  <p class="hci-cont-desc">
                    Guides on how to utilize the functionalities and features
                    that we provide on this app.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="hci-cont">
            <div class="help-center-genops-item">
              <div class="hci-img-container">
                <div>
                  <img src="../assets/connect.png" />
                </div>
              </div>
              <div class="hci-content">
                <div>
                  <p class="hci-cont-title">FAQs</p>
                  <p class="hci-cont-desc">
                    Frequently asked questions. You can also ask you own
                    questions and you would get an answer as soon as possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="hci-cont">
            <div class="help-center-genops-item">
              <div class="hci-img-container">
                <div>
                  <img src="../assets/connect.png" />
                </div>
              </div>
              <div class="hci-content">
                <div>
                  <p class="hci-cont-title">Community</p>
                  <p class="hci-cont-desc">
                    How to make the best of the community activities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="help-center-general-main">
      <div class="hcg-title">
        <p class="hcg-title-main">Getting Started</p>
        <p class="hcg-title-follow">
          Quick options and guides to get you up and running.
        </p>
        <p class="hcg-title-follow">
          For more assistance, Go to our feedback &amp; complaints page
          <span class="pointercursor" @click="goToFeedback()">here</span>
        </p>
      </div>
      <div class="hcg-body">
        <p class="hcg-body-title">Guide Contents</p>
        <vs-collapse :accordion="true">
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
        </vs-collapse>
      </div>
      <div class="hcg-body">
        <p class="hcg-body-title">FAQs</p>
        <vs-collapse :accordion="true">
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
        </vs-collapse>
      </div>
      <div class="hcg-body">
        <p class="hcg-body-title">Community</p>
        <vs-collapse :accordion="true">
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
          <vs-collapse-item>
            <div slot="header">Item</div>
            <div class="guide-item-container">content</div>
          </vs-collapse-item>
        </vs-collapse>
      </div>

      <div class="hcg-footer"></div>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {
    goToFeedback() {
      this.$router.push({
        path: "/home",
      });
    },
  },
};
</script>

<style lang="scss">
#help-center-page-container {
  padding-bottom: 100px;
}

.help-center-background-image-container img {
  position: absolute;
  height: inherit;
}
.help-center-header-contents {
  position: relative;
  padding: 10px;
}
.help-center-header {
  font-weight: 600;
  text-align: center;
  font-size: 200%;
  font-family: "signika-regular";
  display: block;
  padding-top: 55px;
}
.help-center-h-s {
  color: #75a2e4;
}
.help-center-follow {
  text-align: center;
  padding-top: 25px;
  max-width: 500px;
  margin: 0px auto;
  font-size: 130%;
  line-height: 38px;
}
.choose-option-hc {
  font-weight: 600;
  color: #1e87f0;
}
.help-center-genops-container {
  display: flex;
}
.help-center-genops-item {
  border-radius: 10px;
  box-shadow: 0px 0px 15px #e6f0ff;
  display: flex;
  background: #f0f8ff;
  padding: 10px;
  align-items: center;
  flex-direction: column;
}
.hci-cont {
  padding: 10px 10px 10px 10px;
}
.hci-content {
  height: max-content;
}
.hci-img-container img {
  height: auto !important;
  position: static;
  width: 70px;
}
.hci-img-container {
  width: max-content;
}
.hci-cont-title {
  font-weight: 600;
  font-family: signika-regular;
  font-size: 120%;
}
@media (max-width: 768px) {
  .hci-content {
    padding-left: 15px;
  }
  .help-center-genops-container {
    flex-direction: column;
  }
  .help-center-genops-item {
    flex-direction: row;
  }
  .help-center-background-image-container img {
    height: 580px;
  }
}
@media (max-width: 600px) {
  .help-center-background-image-container img {
    height: 590px;
  }
}
@media (max-width: 450px) {
  .help-center-background-image-container img {
    height: 660px;
  }
}
@media (min-width: 768px) {
  .hci-content {
    text-align: center;
    margin-top: 15px;
  }
  .help-center-background-image-container img {
    height: 590px;
  }
}
@media (min-width: 1024px) {
  .help-center-background-image-container .hcbi {
    width: 53.1%;
  }
}
@media (min-width: 1350px) {
  .help-center-background-image-container .hcbi {
    width: 52.5%;
  }
}
@media (min-width: 900px) {
  .help-center-general-main {
    margin-top: 115px !important;
  }
}

.help-center-general-main {
  margin-top: 80px;
  padding: 10px;
}
.hcg-body-title {
  padding-left: 10px;
}
.hcg-body {
  margin-top: 60px !important;
}
.hcg-title {
  text-align: center;
}
.hcg-title-main {
  font-weight: 600;
  font-size: 180%;
  font-family: signika-regular;
}
.hcg-body-title {
  font-size: 120%;
  font-weight: 600;
}
.help-center-general-main .vs-collapse-item {
  margin-bottom: 15px;
}
.help-center-general-main .vs-collapse-item--header {
  padding: 20px;
  background: white;
  border-radius: 10px;
}
.help-center-general-main .vs-collapse-item--header {
  z-index: 0;
}
</style>
