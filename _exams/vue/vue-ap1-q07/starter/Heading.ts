import { h } from "vue";
import type { FunctionalComponent } from "vue";

const Heading: FunctionalComponent<{ level: number }> = (props, { slots }) => {
  // TODO：依照 props.level 決定要渲染 h1～h6 的哪一個
  return h("h1", { class: "heading" }, slots.default?.());
};

Heading.props = ["level"];

export default Heading;
