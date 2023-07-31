<template>
    <section class="course-preview">
        <section>
            <div class="preview-indicator">Course Draft Preview</div>
        </section>
        <div class="classroom-contents">
            <classroom-render-item
                v-bind="currentSection"
            ></classroom-render-item>
        </div>
        <div class="class-controls">
            <div class="course-section-navigation">
                <div class="c-s-prev-container">
                    <p @click="moveToPreviousSection()">
                        <span class="c-s-prev pointercursor"
                            ><i class="fas fa-arrow-left"></i
                        ></span>
                        Previous Section
                    </p>
                </div>
                <div class="c-s-next-container">
                    <p @click="moveToNextSection()">
                        Next Section
                        <span class="c-s-next pointercursor"
                            ><i class="fas fa-arrow-right"></i
                        ></span>
                    </p>
                </div>
            </div>
            <section class="go-back-button-container-c">
                <vs-button
                    @click="goBack()"
                    style="width: 100% !important; display: block !important"
                    ><i class="fas fa-arrow-left"></i> Go Back</vs-button
                >
            </section>
        </div>
    </section>
</template>

<script>
import classroomRenderItemVue from "@/components/classroom-render-item.vue";
export default {
    data: function () {
        return {
            currentSID: 0,
            progressLevel: this.sections.length - 1,
        };
    },
    computed: {
        currentSection: function () {
            return this.sections[this.currentSID];
        },
        finalSection: function () {
            let sections = this.sections;
            if (this.currentSID == sections.length - 1) {
                return true;
            }
        },
    },
    props: {
        sections: Array,
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        moveToNextSection() {
            console.log("moving to next section");
            let nextSection = this.currentSID + 1;
            if (this.finalSection) {
                console.log("You are in the final section of this course");
                this.$vs.notify({
                    title: "You are in the final section of this course. You can't go any further.",
                    color: "#98c2ff",
                });
                return;
            } else if (this.currentSID < this.progressLevel) {
                this.currentSID = nextSection;
                return;
            } else {
                this.submitSectionQuiz();
            }
        },
        moveToPreviousSection() {
            let previousSection = this.currentSID - 1;
            if (this.currentSID !== 0) {
                this.currentSID = previousSection;
            } else {
                this.$vs.notify({
                    title: "You are in the first section of this course. You can go back anymore.",
                    color: "#98c2ff",
                });
            }
            console.log("moving to previous section");
        },
    },
    components: {
        classroomRenderItem: classroomRenderItemVue,
    },
};
</script>

<style lang="scss">
.preview-indicator {
    font-family: candara, signika-regular;
    font-weight: 600;
    font-size: 160%;
    text-align: center;
    padding: 10px 0px 15px 0px;
    color: white;
    background: #181818;
    margin-bottom: 15px;
}
.course-section-navigation {
    margin-top: 50px;
    display: flex;
}
.c-s-next,
.c-s-prev {
    padding: 10px 12px;
    border-radius: 20px;
    margin: 0px 0px;
    border: 1px solid #88c4ff;
    background: #88c4ff;
}
.c-s-prev-container,
.c-s-next-container {
    font-weight: 600;
    color: gray;
}
.c-s-next-container {
    text-align: right;
}
.class-controls {
    padding: 10px;
}
.c-s-prev i,
.c-s-next i {
    color: white;
}
.go-back-button-container-c {
    margin-top: 25px;
}
.course-preview {
    padding-bottom: 70px;
}
</style>
