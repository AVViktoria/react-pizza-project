declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.scss' {
  const content: any;
  export default content;
}
declare module 'lodash' {
  import { debounce } from "lodash";
export default  debounce;
};