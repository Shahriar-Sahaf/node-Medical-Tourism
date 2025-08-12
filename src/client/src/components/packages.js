// Static data for treatment packages
export const options = [
  "Visa Assistance",
  "SIM Card",
  "Airport Transfer",
  "Translation Services",
  "Accommodation",
  "Medical Insurance"
];

export const packages = {
  Bronze: ["Visa Assistance", "SIM Card"],
  Silver: ["Visa Assistance", "SIM Card", "Airport Transfer", "Accommodation"],
  Gold: [...options]
};
     