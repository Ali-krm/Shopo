export const Status = (status) => {
  switch (status) {
    case 0:
      return "Processing";
    case 1:
      return "Refunded";
    case 2:
      return "Completed";
    case 3:
      return "Cancelled";
    case 4:
      return "Shipped";

    default:
      return status;
  }
};
export const TextToStatus = (status) => {
  switch (status) {
    case "Processing":
      return 0;
    case "Refunded":
      return 1;
    case "Completed":
      return 2;
    case "Cancelled":
      return 3;
    case "Shipped":
      return 4;

    default:
      return status;
  }
};
