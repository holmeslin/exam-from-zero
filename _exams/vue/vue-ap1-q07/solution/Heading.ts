import { h } from "vue";
import type { FunctionalComponent } from "vue";

const Heading: FunctionalComponent<{ level: number }> = (props, { slots }) => {
  return h(`h${props.level}`, { class: "heading" }, slots.default?.());
};

Heading.props = ["level"];

export default Heading;
