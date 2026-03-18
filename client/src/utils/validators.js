export function validateCreateOrder(payload) {
  const requiredFields = [
    "pickup_location",
    "dorm_building",
    "floor_no",
    "room_no",
    "service_fee"
  ];

  const missingField = requiredFields.find((field) => !payload[field] && payload[field] !== 0);
  if (missingField) {
    return `${missingField} is required`;
  }

  if (Number(payload.service_fee) < 0) {
    return "service_fee must be greater than or equal to 0";
  }

  return "";
}
