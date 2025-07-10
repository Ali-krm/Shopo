export const covertsize = (size) => {
  switch (size) {
    case "XS":
      return "Extra Small";
    case "S":
      return "Small";
    case "M":
      return "Medium";
    case "L":
      return "Large";
    case "XL":
      return "Extra Large";

    default:
      return size;
  }
};
