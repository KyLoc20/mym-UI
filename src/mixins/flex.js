import { requireOneOf } from "../components/common/validator";
const MapJC = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
};
const MapAI = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    baseline: "baseline",
    stretch: "stretch",
};
export default {
    props: {
        justifyContent: {
            //justify-content: flex-start | flex-end | center | space-between | space-around;
            default: "center",
            validator: (v) => {
                return [
                    requireOneOf(["start", "end", "center", "between", "around"]),
                ].some((test) => test(v));
            },
        },
        alignItems: {
            //align-items: flex-start | flex-end | center | baseline | stretch;
            default: "center",
            validator: (v) => {
                return [
                    requireOneOf(["start", "end", "center", "baseline", "stretch"]),
                ].some((test) => test(v));
            },
        },
    },
    computed: {
        computedJustifyContent() {
            return MapJC[this.justifyContent] || "center";
        },
        computedAlignItems() {
            return MapAI[this.alignItems] || "center";
        },
    }

}