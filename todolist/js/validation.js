export default class Validation {
  constructor() {
    this.checkEmty = (value) => {
      if (value === "") {
        alert("Điền vô đi mẹ!!!, lười ghê :v");
        return true;
      } else {
        return false;
      }
    };
  }
}
