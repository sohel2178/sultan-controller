// types/certificate-types.ts

export type GPSStatus = "ACTIVE" | "EXPIRED" | "SUSPENDED";

export type DeviceStatus = "ONLINE" | "OFFLINE" | "DISCONNECTED";

export interface CompanyInfo {
  companyName: string;
  brandName: string;
  licenseNo: string;
  hotline: string;
  website: string;
  email: string;
}

export interface VehicleInfo {
  ownerName: string;
  registrationNo: string;
  vehicleType: string;
  chassisNo: string;
  engineNo: string;
  imei: string;
  iccid: string;
  deviceModel: string;
  installationDate: string;
  installer: string;
}

export interface CertificateValidity {
  issueDate: string;
  validUntil: string;
  gpsStatus: GPSStatus;
  deviceStatus: DeviceStatus;
  lastCommunication: string;
}

export interface Certificate {
  _id: string;

  certificateNo: string;

  verificationUrl?: string;

  registrationNo: string;

  company: CompanyInfo;

  vehicle: VehicleInfo;

  validity: CertificateValidity;

  verificationCount: number;

  revoked: boolean;

  revokedAt?: string | null;

  notes?: string;

  createdBy?: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateCertificateDto {
  ownerName: string;
  registrationNo: string;
  vehicleType: string;

  chassisNo?: string;
  engineNo?: string;

  imei: string;
  iccid?: string;

  deviceModel: string;

  installationDate: string;
  installer: string;

  issueDate: string;
  validUntil: string;

  gpsStatus: GPSStatus;

  deviceStatus: DeviceStatus;

  notes?: string;
}

export interface UpdateCertificateDto extends Partial<CreateCertificateDto> {}

export interface CertificateListResponse {
  success: boolean;

  items: Certificate[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CertificateResponse {
  success: boolean;
  data: Certificate;
}

export interface VerifyCertificateResponse {
  success: boolean;
  verified: boolean;
  data?: Certificate;
  message?: string;
}

export interface CertificateQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: GPSStatus;
  sort?: string;
}
