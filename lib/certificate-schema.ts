// lib/certificate-schema.ts

import { CreateCertificateDto } from "@/types/certificate-types";

import { z } from "zod";

export const gpsStatusEnum = z.enum(["ACTIVE", "EXPIRED", "SUSPENDED"]);

export const deviceStatusEnum = z.enum(["ONLINE", "OFFLINE", "DISCONNECTED"]);

export const certificateSchema = z
  .object({
    ownerName: z.string().trim().min(3, "Owner name is required."),

    registrationNo: z
      .string()
      .trim()
      .min(3, "Registration number is required."),

    vehicleType: z.string().trim().min(2, "Vehicle type is required."),

    chassisNo: z.string().trim().optional(),

    engineNo: z.string().trim().optional(),

    imei: z
      .string()
      .trim()
      .length(15, "IMEI must be 15 digits.")
      .regex(/^\d+$/, "IMEI must contain only numbers."),

    iccid: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) =>
          !value ||
          (/^\d+$/.test(value) && value.length >= 18 && value.length <= 22),
        {
          message: "ICCID must contain 18–22 digits.",
        },
      ),

    deviceModel: z.string().trim().min(2, "Device model is required."),

    installationDate: z.string().min(1, "Installation date is required."),

    installer: z.string().trim().min(2, "Installer name is required."),

    issueDate: z.string().min(1, "Issue date is required."),

    validUntil: z.string().min(1, "Validity date is required."),

    gpsStatus: gpsStatusEnum,

    deviceStatus: deviceStatusEnum,

    notes: z.string().max(500, "Maximum 500 characters.").optional(),
  })
  .refine(
    (data) =>
      new Date(data.validUntil).getTime() > new Date(data.issueDate).getTime(),
    {
      path: ["validUntil"],
      message: "Validity date must be after issue date.",
    },
  );

export type CertificateFormValues = CreateCertificateDto;
export type CertificateFormOutput = z.output<typeof certificateSchema>;

export const defaultCertificateValues: CertificateFormValues = {
  ownerName: "",

  registrationNo: "",

  vehicleType: "",

  chassisNo: "",

  engineNo: "",

  imei: "",

  iccid: "",

  deviceModel: "VG03 4G",

  installationDate: new Date().toISOString().slice(0, 10),

  installer: "Sultan Tracker",

  issueDate: new Date().toISOString().slice(0, 10),

  validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .slice(0, 10),

  gpsStatus: "ACTIVE",

  deviceStatus: "ONLINE",

  notes: "",
};
