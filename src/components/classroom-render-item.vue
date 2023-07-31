<template>
    <section class="classroom-render-item">
        <div class="c-section-title-container">
            <p>{{ sectionTitle }}</p>
        </div>
        <div class="section-content-container">
            <div v-for="content in contentItems" :key="content.id">
                <div
                    class="c-subheading-container"
                    v-if="content.contentType == 'subheading'"
                >
                    <p>{{ content.content }}</p>
                </div>
                <div
                    class="c-paragraph-container"
                    v-if="content.contentType == 'paragraph'"
                >
                    <p v-html="generateHTML(content.content)"></p>
                </div>
                <div
                    class="c-image-container"
                    v-if="content.contentType == 'image'"
                >
                    <img :src="content.content" />
                </div>
                <div v-if="content.contentType == 'document'">
                    <div
                        class="pdf-doc-container"
                        v-if="isPdf(content.content)"
                    >
                        <div>
                            <a
                                :href="content.content"
                                target="_blank"
                                download="mixam-classroom-material"
                                class="c-download-container"
                            >
                                <img src="../assets/icons8-pdf-50.png" /> Class
                                Material : Pdf Document.
                                <i>Click to Download</i>
                            </a>
                        </div>
                    </div>
                    <div
                        class="word-doc-container"
                        v-if="!isPdf(content.content)"
                    >
                        <div>
                            <a
                                :href="content.content"
                                target="_blank"
                                download="mixam-classroom-material"
                                class="c-download-container"
                            >
                                <img
                                    src="../assets/icons8-microsoft-word-64.png"
                                />
                                Class Material : Word Document.
                                <i>Click to Download</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
function toWordsconver(s) {
    var th_val = ["", "thousand", "million", "billion", "trillion"];
    var dg_val = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];
    var tn_val = [
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
    ];
    var tw_val = [
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
    ];
    s = s.toString();
    s = s.replace(/[\, ]/g, "");
    if (s != parseFloat(s)) return "not a number ";
    var x_val = s.indexOf(".");
    if (x_val == -1) x_val = s.length;
    if (x_val > 15) return "too big";
    var n_val = s.split("");
    var str_val = "";
    var sk_val = 0;
    for (var i = 0; i < x_val; i++) {
        if ((x_val - i) % 3 == 2) {
            if (n_val[i] == "1") {
                str_val += tn_val[Number(n_val[i + 1])] + " ";
                i++;
                sk_val = 1;
            } else if (n_val[i] != 0) {
                str_val += tw_val[n_val[i] - 2] + " ";
                sk_val = 1;
            }
        } else if (n_val[i] != 0) {
            str_val += dg_val[n_val[i]] + " ";
            if ((x_val - i) % 3 == 0) str_val += "hundred ";
            sk_val = 1;
        }
        if ((x_val - i) % 3 == 1) {
            if (sk_val) str_val += th_val[(x_val - i - 1) / 3] + " ";
            sk_val = 0;
        }
    }
    if (x_val != s.length) {
        var y_val = s.length;
        str_val += "point ";
        for (var i = x_val + 1; i < y_val; i++)
            str_val += dg_val[n_val[i]] + " ";
    }
    return str_val.replace(/\s+/g, " ");
}
export default {
    data: function () {
        return {};
    },
    computed: {
        sectionTitle: function () {
            if (this.title) {
                return this.title.content;
            }
            return "";
        },
    },
    methods: {
        generateHTML(val) {
            let html = val.replaceAll("\n", "<br>");
            return html;
        },
        isPdf(val) {
            console.log("is pdf", val.indexOf(".pdf") !== -1);
            return val.indexOf(".pdf") !== -1;
        },
    },
    components: {},
    created: function () {},
    props: {
        title: Object,
        contentItems: Array,
        quizes: Array,
    },
};
</script>

<style lang="scss">
.classroom-render-item {
    padding-top: 25px;
}
.c-section-title-container {
    font-size: 200%;
    font-weight: 600;
    font-family: Signika-regular;
    text-align: center;
    padding: 10px 10px 30px 10px;
}
.c-subheading-container {
    font-size: 150%;
    font-family: "signika-light";
    font-weight: 600;
    padding-bottom: 10px;
    padding: 10px;
}
.c-paragraph-container {
    padding-bottom: 15px;
    padding: 15px;
}
.c-image-container {
    padding: 15px 15px 15px 15px;
}
.c-image-container img {
    border-radius: 10px;
    box-shadow: 0px 0px 5px gray;
}
.word-doc-container img,
.pdf-doc-container img {
    width: 40px;
}
.word-doc-container div,
.pdf-doc-container div {
    padding: 10px;
}
.c-download-container {
    border: 1px solid #cbe0ff;
    border-radius: 10px;
    padding: 10px;
    display: block;
    width: 100%;
}
</style>
