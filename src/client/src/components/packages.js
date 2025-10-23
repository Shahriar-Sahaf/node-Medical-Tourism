// Static data for treatment packages
export const options = {
  en: {
    visa: "Visa Assistance",
    sim: "SIM Card",
    transfer: "Airport Transfer",
    translation: "Translation Services",
    accommodation: "Accommodation",
    insurance: "Medical Insurance"
  },
  fa: {
    visa: "کمک ویزا",
    sim: "سیم کارت",
    transfer: "انتقال فرودگاهی",
    translation: "خدمات ترجمه",
    accommodation: "اقامت",
    insurance: "بیمه پزشکی"
  }
};

export const packages = {
  Bronze: ["visa", "sim"],
  Silver: ["visa", "sim", "transfer", "accommodation"],
  Gold: ["visa", "sim", "transfer", "translation", "accommodation", "insurance"]
};
     