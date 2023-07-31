<template>
    <div class="profile-builder">
        <modal
            :clickToClose="false"
            name="profilebuilder"
            :adaptive="true"
            height="auto"
            :max-width="maxWidth"
            width="90%"
            @opened="updateCurrentSection()"
        >
            <section :placa="profileBuilderOpen">
                <!--template-->
                <div class="profile-builder hiddenitem item-template-container">
                    <!--header-section-->
                    <div class="profile-builder header">
                        <div class="profile-builder-logo-container">
                            <div>
                                <div class="logo-container">
                                    <p class="company-name">
                                        Mixam
                                        <img
                                            class="mixam-logo mixam-logo-in-welcome"
                                            src="../assets/logo.png"
                                        />
                                    </p>
                                    <p class="company-name-follow">BUSINESS</p>
                                </div>
                            </div>
                        </div>
                        <div class="profile-builder title-container">
                            <p class="profile-builder item-title">
                                Your Title Here
                            </p>
                        </div>
                    </div>
                    <!--body section-->
                    <section class="profile-builder body-section-container">
                        <div
                            class="profile-builder interactive-image-container"
                        >
                            <div>
                                <img
                                    src="../assets/4630807.jpg"
                                    alt="interactive image"
                                />
                            </div>
                        </div>
                        <div class="profile-builder main-content-container">
                            <div>
                                <div
                                    class="profile-builder content-container"
                                ></div>
                                <div class="profile-builder buttons-container">
                                    <button class="profile-builder-button">
                                        Button Value
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <!--Welcome, Choose a username, upload a profile photo, what kind of business are you into.-->
                <!--Welcome-->
                <div
                    :class="{ hiddenitem: welcome }"
                    class="animate__animated animate__fadeIn profile-builder item-template-container"
                >
                    <!--header-section-->
                    <div class="profile-builder header">
                        <div class="profile-builder-logo-container">
                            <div>
                                <div class="logo-container">
                                    <p class="company-name">
                                        Mixam
                                        <img
                                            class="mixam-logo"
                                            src="../assets/logo.png"
                                        />
                                    </p>
                                    <p class="company-name-follow">BUSINESS</p>
                                </div>
                            </div>
                        </div>
                        <div class="profile-builder title-container">
                            <p class="profile-builder item-title">
                                Welcome to Mixam!
                            </p>
                        </div>
                    </div>
                    <!--body section-->
                    <section class="profile-builder body-section-container">
                        <div
                            class="profile-builder interactive-image-container"
                        >
                            <div>
                                <img
                                    src="../assets/4630807.jpg"
                                    alt="interactive image"
                                />
                            </div>
                        </div>
                        <div class="profile-builder main-content-container">
                            <div>
                                <div
                                    id="welcome-content"
                                    class="profile-builder content-container"
                                >
                                    <p>Hi,</p>
                                    <p>
                                        We are so elated that you joined us.
                                        Let's get this adventure started
                                    </p>
                                </div>
                                <div class="profile-builder buttons-container">
                                    <button
                                        @click="moveToChooseUsername()"
                                        class="profile-builder-button"
                                    >
                                        Next <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <!-- Choose Username -->
                <div
                    :class="{ hiddenitem: chooseusername }"
                    class="profile-builder item-template-container"
                >
                    <!--header-section-->
                    <div class="profile-builder header">
                        <div class="profile-builder-logo-container">
                            <div>
                                <div class="logo-container">
                                    <p class="company-name">
                                        Mixam
                                        <img
                                            class="mixam-logo"
                                            src="../assets/logo.png"
                                        />
                                    </p>
                                    <p class="company-name-follow">BUSINESS</p>
                                </div>
                            </div>
                        </div>
                        <div class="profile-builder title-container">
                            <p class="profile-builder item-title">
                                Add your name to your Profile.
                            </p>
                        </div>
                    </div>
                    <!--body section-->
                    <section
                        class="animate__animated animate__fadeIn profile-builder body-section-container"
                    >
                        <div
                            class="profile-builder interactive-image-container"
                        >
                            <div>
                                <img
                                    src="../assets/4630807.jpg"
                                    alt="interactive image"
                                />
                            </div>
                        </div>
                        <div class="profile-builder main-content-container">
                            <div>
                                <div class="profile-builder content-container">
                                    <p class="usernametext">
                                        Name <i>(eg : Jane Doe)</i> :
                                    </p>
                                    <p>
                                        <input
                                            v-model="username"
                                            type="text"
                                            class="usenameinput"
                                        />
                                    </p>
                                </div>
                                <div class="profile-builder buttons-container">
                                    <button
                                        class="profile-builder-button"
                                        @click="sendUsername()"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <!-- Upload Profile Photo -->
                <div
                    :class="{ hiddenitem: uploadphoto }"
                    class="profile-builder item-template-container"
                >
                    <!--header-section-->
                    <div class="profile-builder header">
                        <div class="profile-builder-logo-container">
                            <div>
                                <div class="logo-container">
                                    <p class="company-name">
                                        Mixam
                                        <img
                                            class="mixam-logo"
                                            src="../assets/logo.png"
                                        />
                                    </p>
                                    <p class="company-name-follow">BUSINESS</p>
                                </div>
                            </div>
                        </div>
                        <div class="profile-builder title-container">
                            <p class="profile-builder item-title">
                                Upload a Profile Photo
                            </p>
                        </div>
                    </div>
                    <!--body section-->
                    <section
                        class="animate__animated animate__fadeIn profile-builder body-section-container"
                    >
                        <div
                            class="profile-builder interactive-image-container"
                        >
                            <div>
                                <img
                                    src="../assets/4630807.jpg"
                                    alt="interactive image"
                                />
                            </div>
                        </div>
                        <div class="profile-builder main-content-container">
                            <div>
                                <div class="profile-builder content-container">
                                    <p class="usernametext">
                                        Upload your profile photo here
                                    </p>
                                    <form
                                        id="profilephoto"
                                        enctype="multipart/form-data"
                                    >
                                        <p class="uploadinput-container">
                                            <input
                                                name="profilephotoupload"
                                                type="file"
                                                class="photoupload"
                                                id="ppupload"
                                            />
                                        </p>
                                    </form>
                                </div>
                                <div
                                    id="upload"
                                    class="profile-builder buttons-container"
                                >
                                    <button
                                        @click="moveToDescription()"
                                        id="skip-btn-upload"
                                        class="profile-builder-button"
                                    >
                                        Skip</button
                                    ><button
                                        @click="sendProfilePhoto()"
                                        class="profile-builder-button"
                                    >
                                        Next <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- What best describes you currently? -->
                <div
                    :class="{ hiddenitem: description }"
                    class="profile-builder item-template-container"
                >
                    <!--header-section-->
                    <div class="profile-builder header">
                        <div class="profile-builder-logo-container">
                            <div>
                                <div class="logo-container">
                                    <p class="company-name">
                                        Mixam
                                        <img
                                            class="mixam-logo"
                                            src="../assets/logo.png"
                                        />
                                    </p>
                                    <p class="company-name-follow">BUSINESS</p>
                                </div>
                            </div>
                        </div>
                        <div class="profile-builder title-container">
                            <p class="profile-builder item-title">
                                What best describes you currently?
                            </p>
                        </div>
                    </div>
                    <!--body section-->
                    <section
                        class="animate__animated animate__fadeIn profile-builder body-section-container"
                    >
                        <div
                            class="profile-builder interactive-image-container"
                        >
                            <div>
                                <img
                                    src="../assets/4630807.jpg"
                                    alt="interactive image"
                                />
                            </div>
                        </div>
                        <div
                            class="profile-builder main-content-container desc"
                        >
                            <div>
                                <div class="profile-builder content-container">
                                    <p class="user-desc-text">
                                        Choose the most accurate from the
                                        options
                                    </p>
                                    <form
                                        class="user-current-employment-status"
                                    >
                                        <div class="checkbox">
                                            <p class="w-mcontent">
                                                <vs-radio
                                                    color="#e48346"
                                                    v-model="employmentStatus"
                                                    vs-value="Student"
                                                    >Student</vs-radio
                                                >
                                            </p>
                                            <p class="w-mcontent">
                                                <vs-radio
                                                    color="success"
                                                    v-model="employmentStatus"
                                                    vs-value="Self Employed"
                                                    >Self Employed</vs-radio
                                                >
                                            </p>
                                            <p class="w-mcontent">
                                                <vs-radio
                                                    color="danger"
                                                    v-model="employmentStatus"
                                                    vs-value="Employed"
                                                    >Employed</vs-radio
                                                >
                                            </p>
                                            <p class="w-mcontent">
                                                <vs-radio
                                                    color="warning"
                                                    v-model="employmentStatus"
                                                    vs-value="Retired"
                                                    >Retired</vs-radio
                                                >
                                            </p>
                                            <p class="w-mcontent">
                                                <vs-radio
                                                    color="dark"
                                                    v-model="employmentStatus"
                                                    vs-value="Unemployed"
                                                    >Unemployed</vs-radio
                                                >
                                            </p>
                                        </div>
                                    </form>
                                </div>
                                <div class="profile-builder buttons-container">
                                    <button
                                        @click="sendUserDescription()"
                                        class="profile-builder-button"
                                    >
                                        Proceed
                                        <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <!-- What would best describe an activities that you would do alot on Mixam? -->
                <div
                    :class="{ hiddenitem: preferredActivities }"
                    class="profile-builder item-template-container"
                >
                    <!--header-section-->
                    <div class="profile-builder header">
                        <div class="profile-builder-logo-container">
                            <div>
                                <div class="logo-container">
                                    <p class="company-name">
                                        Mixam
                                        <img
                                            class="mixam-logo"
                                            src="../assets/logo.png"
                                        />
                                    </p>
                                    <p class="company-name-follow">BUSINESS</p>
                                </div>
                            </div>
                        </div>
                        <div class="profile-builder title-container">
                            <p class="profile-builder item-title">
                                Activity Preference
                            </p>
                        </div>
                    </div>
                    <!--body section-->
                    <section
                        class="animate__animated animate__fadeIn profile-builder body-section-container"
                    >
                        <div
                            class="profile-builder interactive-image-container"
                        >
                            <div>
                                <img
                                    src="../assets/4630807.jpg"
                                    alt="interactive image"
                                />
                            </div>
                        </div>
                        <div
                            class="profile-builder main-content-container ac-pref"
                        >
                            <div>
                                <div class="profile-builder content-container">
                                    <p>
                                        Which activities would you most like to
                                        do?
                                    </p>
                                    <p class="ac-item">
                                        <vs-checkbox
                                            color="#720ea8"
                                            @change="
                                                addPreference(
                                                    community,
                                                    'community'
                                                )
                                            "
                                            v-model="community"
                                            >Interact with the Mixam
                                            Community</vs-checkbox
                                        >
                                    </p>
                                    <p class="ac-item">
                                        <vs-checkbox
                                            color="#720ea8"
                                            @change="
                                                addPreference(
                                                    shareCreate,
                                                    'shareCreate'
                                                )
                                            "
                                            v-model="shareCreate"
                                            >Share with the community via Posts,
                                            Articles or Courses</vs-checkbox
                                        >
                                    </p>
                                    <p class="ac-item">
                                        <vs-checkbox
                                            color="#720ea8"
                                            @change="
                                                addPreference(
                                                    learning,
                                                    'learning'
                                                )
                                            "
                                            v-model="learning"
                                            >Learning with free Short
                                            Courses</vs-checkbox
                                        >
                                    </p>
                                </div>
                                <div class="profile-builder buttons-container">
                                    <button
                                        @click="senduserPreferredActivities()"
                                        class="profile-builder-button"
                                    >
                                        Proceed
                                        <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <!-- Pick a topic(s) that interest you. -->
                <div
                    :class="{ hiddenitem: pickInterest }"
                    class="profile-builder item-template-container"
                >
                    <!--header-section-->
                    <div class="profile-builder header">
                        <div class="profile-builder-logo-container">
                            <div>
                                <div class="logo-container">
                                    <p class="company-name">
                                        Mixam
                                        <img
                                            class="mixam-logo"
                                            src="../assets/logo.png"
                                        />
                                    </p>
                                    <p class="company-name-follow">BUSINESS</p>
                                </div>
                            </div>
                        </div>
                        <div class="profile-builder title-container">
                            <p class="profile-builder item-title">
                                Topics of interest.
                            </p>
                        </div>
                    </div>
                    <!--body section-->
                    <section
                        class="animate__animated animate__fadeIn profile-builder body-section-container"
                    >
                        <div
                            class="profile-builder interactive-image-container"
                        >
                            <div>
                                <img
                                    src="../assets/4630807.jpg"
                                    alt="interactive image"
                                />
                            </div>
                        </div>
                        <div
                            class="profile-builder main-content-container topicI add100height"
                        >
                            <div class="add100height">
                                <div
                                    class="profile-builder content-container add100height"
                                >
                                    <p>
                                        Select a topic(s) that interest you
                                        below
                                    </p>
                                    <form
                                        class="interest-container add80height"
                                    >
                                        <p class="interest-box-direct">
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest: business,
                                                }"
                                                @click="
                                                    addInterest(
                                                        business,
                                                        'business'
                                                    )
                                                "
                                                >Business</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest:
                                                        workingabroad,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        workingabroad,
                                                        'workingabroad'
                                                    )
                                                "
                                                >Working Abroad</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest:
                                                        jobinterviews,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        jobinterviews,
                                                        'jobinterviews'
                                                    )
                                                "
                                                >Job Interviews</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest: startups,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        startups,
                                                        'startups'
                                                    )
                                                "
                                                >Start Ups</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest: leadership,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        leadership,
                                                        'leadership'
                                                    )
                                                "
                                                >Leadership</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest:
                                                        innovations_and_opportunities,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        innovations_and_opportunities,
                                                        'innovations_and_opportunities'
                                                    )
                                                "
                                                >Innovations and
                                                Opportunities</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest:
                                                        value_creation,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        value_creation,
                                                        'value_creation'
                                                    )
                                                "
                                                >Value creation</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest:
                                                        capital_resources_and_organization,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        capital_resources_and_organization,
                                                        'capital_resources_and_organization'
                                                    )
                                                "
                                                >Capital, resources and
                                                organization</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest:
                                                        accounting_and_finance,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        accounting_and_finance,
                                                        'accounting_and_finance'
                                                    )
                                                "
                                                >Accounting and Finance</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest:
                                                        lean_startup,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        lean_startup,
                                                        'lean_startup'
                                                    )
                                                "
                                                >Lean startup</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest:
                                                        small_business,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        small_business,
                                                        'small_business'
                                                    )
                                                "
                                                >Small business</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest:
                                                        innovation_and_creativity,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        innovation_and_creativity,
                                                        'innovation_and_creativity'
                                                    )
                                                "
                                                >Innovation and creativity</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest: crypto,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        crypto,
                                                        'crypto'
                                                    )
                                                "
                                                >Crypto</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest:
                                                        brand_awareness,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        brand_awareness,
                                                        'brand_awareness'
                                                    )
                                                "
                                                >Brand awareness</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest:
                                                        business_ethics,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        business_ethics,
                                                        'business_ethics'
                                                    )
                                                "
                                                >Business Ethics</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest: law,
                                                }"
                                                color="#720ea8"
                                                @click="addInterest(law, 'law')"
                                                >Law</span
                                            >
                                            <span
                                                class="interest-item pointercursor"
                                                :class="{
                                                    picked_interest: technology,
                                                }"
                                                color="#720ea8"
                                                @click="
                                                    addInterest(
                                                        technology,
                                                        'technology'
                                                    )
                                                "
                                                >Technology</span
                                            >
                                        </p>
                                    </form>
                                </div>
                                <div class="profile-builder buttons-container">
                                    <button
                                        @click="sendUserInterest"
                                        class="profile-builder-button"
                                    >
                                        Finish
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "profile-builder-and-welcome",
            maxWidth: 400,
            username: "",
            welcome: true,
            uploadphoto: true,
            description: true,
            preferredActivities: true,
            pickInterest: true,
            chooseusername: true,
            businesstypeinput: "",
            community: false,
            shareCreate: false,
            learning: false,
            userAgent: this.$store.state.__userAgent,
            employmentStatus: "",
            business: false,
            workingabroad: false,
            jobinterviews: false,
            startups: false,
            leadership: false,
            innovations_and_opportunities: false,
            value_creation: false,
            capital_resources_and_organization: false,
            accounting_and_finance: false,
            lean_startup: false,
            small_business: false,
            innovation_and_creativity: false,
            crypto: false,
            brand_awareness: false,
            business_ethics: false,
            law: false,
            technology: false,
            interests: [],
            activityPref: [],
        };
    },
    computed: {
        profileBuilderOpen() {
            console.log(
                "profilebuilderopen",
                this.$store.state.profileBuilderOpen
            );
            return this.$store.state.profileBuilderOpen;
        },
    },
    methods: {
        async sendPostCloudinaryReq(){
            this.$vs.loading();
            let file = document.getElementById("ppupload").files[0];
            const url = "https://api.cloudinary.com/v1_1/mixambusiness/image/upload";
            const formData = new FormData();
            formData.append("file",file);
            formData.append("upload_preset","skmmp7bt");
            return await window.axios.post(url,formData);
        },
        updateCurrentSection() {
            let present = this.$store.state.userAccountInfo.welcomeProgress;
            this[present] = false;
            console.log(" opened the profile builder ", present);
        },
        openProfileBuilder() {
            this.$modal.show("profilebuilder");
        },
        closeProfileBuilder() {
            this.$modal.hide("profilebuilder");
        },
        moveToChooseUsername() {
            this.welcome = true;
            this.chooseusername = false;
        },
        moveToUploadPhoto() {
            this.chooseusername = true;
            this.uploadphoto = false;
        },
        moveToBusinessType() {
            this.uploadphoto = true;
            this.businesstype = false;
        },
        moveToDescription() {
            this.uploadphoto = true;
            this.description = false;
        },
        moveToPreferedActivities() {
            this.description = true;
            this.preferredActivities = false;
        },
        moveToPickInterests() {
            this.preferredActivities = true;
            this.pickInterest = false;
        },
        finish() {
            this.$store.commit("updateprofilebuilder", false);
        },
        addInterest(boo, val) {
            boo = !boo;
            this[val] = boo;
            if (boo) {
                this.interests.push(val);
            } else {
                this.interests = this.interests.filter((x) => {
                    return x !== val;
                });
            }
        },
        addPreference(boo, val) {
            if (boo) {
                this.activityPref.push(val);
            } else {
                this.activityPref = this.activityPref.filter((x) => {
                    return x !== val;
                });
                console.log(this.activityPref);
            }
        },
        sendUsername() {
            this.$modal.hide("dialog");
            if (this.username == "") {
                this.$modal.show("dialog", {
                    title: "You did not input any name",
                    text: "You have to provide your name to proceed",
                    buttons: [
                        {
                            title: "Okay",
                            handler: () => {
                                this.$modal.hide("dialog");
                            },
                        },
                    ],
                });
                return;
            }
            this.$vs.loading();
            let url = `${this.$store.state.apiServer}/submitdatainit/`;
            let MID = this.$store.state.userAccountInfo.__mid;
            let DID = JSON.parse(
                window.localStorage.getItem("userlogindata")
            ).DID;
            console.log("MID and DID", MID, DID);
            // let url = "/submitdatainit";
            window.axios
                .post(url, {
                    params: {
                        action: "addusername",
                        data: this.username,
                        MID,
                        DID,
                        userAgent: this.userAgent,
                    },
                })
                .then((response) => {
                    this.$vs.loading.close();
                    let data = response.data;
                    console.log("username response");
                    if (data.status == "success") {
                        console.log("successfully added username");
                        this.moveToUploadPhoto();
                    } else {
                        this.$modal.show("dialog", {
                            title: "Unable to add your name Information",
                            text: "We are unable to add your name to our database now due to some issues we are experiencing now. Our team is working to get you back on track. You skip this section for now and edit your username later in your profile settings or try again with the button.",
                            buttons: [
                                {
                                    title: "Try Again",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                        this.sendUsername();
                                    },
                                },
                                {
                                    title: "Skip This Section",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                        this.moveToUploadPhoto();
                                    },
                                },
                            ],
                        });
                    }
                })
                .catch((error) => {
                    this.$vs.loading.close();
                    console.error(error);
                    this.$modal.show("dialog", {
                        title: "Unable to add your username info",
                        text: error.message,
                        buttons: [
                            {
                                title: "Try Again",
                                handler: () => {
                                    this.$modal.hide("dialog");
                                    this.sendUsername();
                                },
                            },
                        ],
                    });
                });
        },
        async sendProfilePhoto() {
            let uploadedUrl =await this.sendPostCloudinaryReq().catch(()=>{
                this.$vs.loading.close();
            });
            console.log("uploaded url", uploadedUrl.data.url);
            this.$modal.hide("dialog");
            let action = "addprofilephoto";
            let MID = this.$store.state.userAccountInfo.__mid;
            let DID = JSON.parse(
                window.localStorage.getItem("userlogindata")
            ).DID;
            console.log("action, MID and DID", MID, DID, action);
            let url = `${this.$store.state.apiServer}/submitdatainit/`;
            // let url = "/submitdatainit";
            console.log(url);
            let formElement = document.getElementById("profilephoto");
            let formData = new FormData();
            let profilePhotoInput = document.getElementById("ppupload");
            if (profilePhotoInput.value == "") {
                this.$modal.show("dialog", {
                    title: "You have not uploaded any file",
                    text: 'You have to selected an image to proceed. Kindly select an image from your phone and click "Next" to try again. If you want to do this later, click on the skip button. ',
                    buttons: [
                        {
                            title: "Okay",
                            handler: () => {
                                this.$modal.hide("dialog");
                            },
                        },
                    ],
                });
                return;
            }
            formData.append(
                "params",
                JSON.stringify({ action, MID, DID,profileURL : uploadedUrl.data.url})
            );
            window.axios
                .post(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    this.$vs.loading.close();
                    let data = response.data;
                    if (data.status == "success") {
                        console.log("successfully uploaded proile photo", data);
                        this.moveToDescription();
                    } else {
                        this.$modal.show("dialog", {
                            title: "unable to upload Profile Photo Now.",
                            text: "We are unable to upload your profile photo to our database due to some issues we are experiencing now. Our team is working to get you back on track. You skip this section for now and upload your profile photo later in your profile settings or try again with the button.",
                            buttons: [
                                {
                                    title: "Try Again",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                        this.sendProfilePhoto();
                                    },
                                },
                                {
                                    title: "Skip This Section",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                        this.moveToBusinessType();
                                    },
                                },
                            ],
                        });
                    }
                })
                .catch((error) => {
                    this.$vs.loading.close();
                    console.log("unable to send profile photo");
                    this.$modal.show("dialog", {
                        title: "unable to upload your profile photo",
                        text: "Reason : " + error.message,
                        buttons: [
                            {
                                title: "Try Again",
                                handler: () => {
                                    this.$modal.hide("dialog");
                                    this.sendProfilePhoto();
                                },
                            },
                        ],
                    });
                });
        },
        sendUserDescription() {
            this.$modal.hide("dialog");
            // validate before send;
            let MID = this.$store.state.userAccountInfo.__mid;
            let DID = JSON.parse(
                window.localStorage.getItem("userlogindata")
            ).DID;
            console.log("mid ", MID);
            if (this.employmentStatus == "") {
                this.$modal.show("dialog", {
                    title: "Choose one from the options below",
                    text: "You have not picked any option. Select one to proceed.",
                    buttons: [
                        {
                            title: "Okay",
                            handler: () => {
                                this.$modal.hide("dialog");
                            },
                        },
                    ],
                });
                return;
            }
            this.$vs.loading();
            let url = `${this.$store.state.apiServer}/submitdatainit/`;
            window.axios
                .post(url, {
                    params: {
                        action: "adduseremployment",
                        data: this.employmentStatus,
                        MID,
                        DID,
                        userAgent: this.userAgent,
                    },
                })
                .then((response) => {
                    this.$vs.loading.close();
                    if (response.data.status == "success") {
                        this.moveToPreferedActivities();
                        console.log("updated user employment status success");
                    } else {
                        this.$modal.show("dialog", {
                            title: "Unable to add your info",
                            text: "We are unable to add your data to our database now due to some issues we are experiencing now. Our team is working to get you back on track. You skip this section for now and edit your username later in your profile settings or try again with the button.",
                            buttons: [
                                {
                                    title: "Try Again",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                        this.sendUserDescription();
                                    },
                                },
                                {
                                    title: "Skip This Section",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                        this.moveToPreferedActivities();
                                    },
                                },
                            ],
                        });
                    }
                })
                .catch((error) => {
                    this.$vs.loading.close();
                    console.error(error);
                    this.$modal.show("dialog", {
                        title: "Unable to add your information now",
                        text: error.message,
                        buttons: [
                            {
                                title: "Try Again",
                                handler: () => {
                                    this.$modal.hide("dialog");
                                    this.sendUserDescription();
                                },
                            },
                        ],
                    });
                });
        },
        senduserPreferredActivities() {
            this.$modal.hide("dialog");
            let action = "adduserpreferredactivities";
            let MID = this.$store.state.userAccountInfo.__mid;
            let DID = JSON.parse(
                window.localStorage.getItem("userlogindata")
            ).DID;
            console.log("action, MID and DID", MID, DID, action);
            let url = `${this.$store.state.apiServer}/submitdatainit/`;
            // let url = "/submitdatainit";
            if (this.activityPref.length == 0) {
                this.$modal.show("dialog", {
                    title: "Choose one from the options below",
                    text: "You have not picked any option. Select one to proceed.",
                    buttons: [
                        {
                            title: "Okay",
                            handler: () => {
                                this.$modal.hide("dialog");
                            },
                        },
                    ],
                });
                return;
            }
            this.$vs.loading();
            window.axios
                .post(url, {
                    params: {
                        action,
                        MID,
                        DID,
                        userAgent: this.userAgent,
                        data: this.activityPref,
                    },
                })
                .then((response) => {
                    this.$vs.loading.close();
                    if (response.data.status == "success") {
                        this.moveToPickInterests();
                        console.log(
                            "updated user activity preference status success"
                        );
                    } else {
                        this.$modal.show("dialog", {
                            title: "Unable to add your info",
                            text: "We are unable to add your data to our database now due to some issues we are experiencing now. Our team is working to get you back on track. You skip this section for now and edit your username later in your profile settings or try again with the button.",
                            buttons: [
                                {
                                    title: "Try Again",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                        this.senduserPreferredActivities();
                                    },
                                },
                                {
                                    title: "Skip This Section",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                        this.moveToPickInterests();
                                    },
                                },
                            ],
                        });
                    }
                })
                .catch((error) => {
                    this.$vs.loading.close();
                    console.error(error);
                    this.$modal.show("dialog", {
                        title: "Unable to add your information now",
                        text: error.message,
                        buttons: [
                            {
                                title: "Try Again",
                                handler: () => {
                                    this.$modal.hide("dialog");
                                    this.sendUserDescription();
                                },
                            },
                        ],
                    });
                });
        },
        sendUserInterest() {
            this.$modal.hide("dialog");
            let action = "adduserinterest";
            let MID = this.$store.state.userAccountInfo.__mid;
            let DID = JSON.parse(
                window.localStorage.getItem("userlogindata")
            ).DID;
            console.log("action, MID and DID", MID, DID, action);
            let url = `${this.$store.state.apiServer}/submitdatainit/`;
            // let url = "/submitdatainit";
            if (this.interests.length == 0) {
                this.$modal.show("dialog", {
                    title: "Choose one from the options below",
                    text: "You have not picked any option. Select one to proceed.",
                    buttons: [
                        {
                            title: "Okay",
                            handler: () => {
                                this.$modal.hide("dialog");
                            },
                        },
                    ],
                });
                return;
            }
            this.$vs.loading();
            window.axios
                .post(url, {
                    params: {
                        action,
                        MID,
                        DID,
                        userAgent: this.userAgent,
                        data: this.interests,
                    },
                })
                .then((response) => {
                    this.$vs.loading.close();
                    if (response.data.status == "success") {
                        this.finish();
                        console.log("updated user interests success");
                    } else {
                        this.$modal.show("dialog", {
                            title: "Unable to add your info",
                            text: "We are unable to add your data to our database now due to some issues we are experiencing now. Our team is working to get you back on track. You skip this section for now and edit your username later in your profile settings or try again with the button.",
                            buttons: [
                                {
                                    title: "Try Again",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                        this.sendUserInterest();
                                    },
                                },
                                {
                                    title: "Skip This Section",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                        this.finish();
                                    },
                                },
                            ],
                        });
                    }
                })
                .catch((error) => {
                    this.$vs.loading.close();
                    console.error(error);
                    this.$modal.show("dialog", {
                        title: "Unable to add your information now",
                        text: error.message,
                        buttons: [
                            {
                                title: "Try Again",
                                handler: () => {
                                    this.$modal.hide("dialog");
                                    this.sendUserInterest();
                                },
                            },
                        ],
                    });
                });

            this.finish();
        },
    },
    watch: {
        profileBuilderOpen(old, value) {
            old == true
                ? this.openProfileBuilder()
                : this.closeProfileBuilder();
            value;
            console.log("new value for profileBuilderOpen", old);
        },
    },
};
</script>

<style lang="scss">
.profile-builder {
    font-family: "Antipasto-Bold";
}
.profile-builder.header {
    width: 90%;
    border-radius: 10px;
    margin: 18px auto;
    padding-top: 5px;
    background-color: #3ac0fd;
}
.profile-builder-logo-container {
    width: max-content;
    height: max-content;
    background-color: white;
    border-radius: 10px;
    margin: 5px;
    padding: 0px 5px 0px 5px;
}
.profile-builder .company-name-follow {
    color: #03a9f4;
}
.interactive-image-container img {
    width: 40%;
    margin: 0px auto;
    display: block;
}
.profile-builder.main-content-container {
    width: 90%;
    border: 1px solid #03a9f4;
    margin: 5px auto;
    height: 200px;
    margin-bottom: 30px;
    border-radius: 12px;
}
.profile-builder .item-title {
    color: white;
    padding-left: 7px;
    font-size: 22px;
}
.profile-builder-button {
    border: 0px solid;
    background: #3dab46;
    color: white;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    display: block;
    margin: 0px auto;
}
#upload {
    width: max-content;
    margin: 0px auto;
}
#upload button {
    display: inline-block;
    margin: 5px;
}
#skip-btn-upload {
    background: #143539;
}
#welcome-content {
    text-align: center;
    margin-bottom: 15px;
    margin-top: 15%;
    font-family: "Montserrat-Bold";
    padding: 0px 10px 0px 10px;
}
.hiddenitem {
    display: none;
}
.usenameinput {
    width: 90%;
    height: 35px;
    border-radius: 5px;
    border: 2px solid #b0b0b0;
    margin: 0px auto;
    display: block;
    margin-bottom: 10px;
}
.usernametext {
    width: 90%;
    margin: 0px auto;
    margin-top: 50px !important;
}
.textarea {
    height: 50px;
}
.uploadinput-container {
    width: 90%;
    margin: 0px auto;
    margin-bottom: 10px !important;
}
.photoupload {
    padding: 10px;
    border: 1px solid gray;
    width: 100%;
}
.user-desc-text.checkbox p {
    width: max-content;
}
.w-mcontent {
    width: max-content;
}
.user-current-employment-status {
    padding-bottom: 16px;
}
.main-content-container.desc,
.main-content-container.ac-pref {
    padding: 15px;
}
.main-content-container.topicI {
    padding: 7px;
}
.ac-item {
    font-weight: 400;
    font-family: "signika-light";
    color: #373759;
    width: max-content;
    padding: 5px 0px 5px 0px;
}
.interest-container {
    padding: 10px;
    height: 80%;
    overflow-y: scroll;
}
.interest-container p span {
    display: inline-block;
    font-family: signika-light;
}
.interest-container p .vs-checkbox {
    width: 15px !important;
    height: 15px !important;
}
.interest-container .con-slot-label {
    position: relative;
    bottom: 2px;
}
.topicIitem {
    padding: 5px;
    width: max-content;
}
.topicIitem div {
    display: inline !important;
}
.interest-box-direct {
}
.picked_interest {
    background-color: #cbe0ff;
}
.interest-item {
    border-radius: 20px;
    height: 35px;
    padding: 5px 15px 5px 15px;
    border: 1px solid #1e87f0;
    margin-right: 10px;
    margin-bottom: 5px;
}
.add100height {
    height: 100%;
}
.add80height {
    height: 80%;
}
.profile-builder .mixam-logo {
    width: 30px !important;
}
</style>
