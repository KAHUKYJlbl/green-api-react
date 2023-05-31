export type NewContactData = {
  phoneNumber: number;
};

export type CheckNewContactResponse = {
  existsWhatsapp: boolean;
};

export type CheckNewContactResult = CheckNewContactResponse & NewContactData;
