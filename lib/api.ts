import { Command } from "@/types/command";
import { Device } from "@/types/device";
import { Payment } from "@/types/payment";
import { MonthlyPaymentRequest } from "@/types/report";
import { User } from "@/types/user";
import axios from "axios";

import {
  Certificate,
  CertificateListResponse,
  CertificateQuery,
  CertificateResponse,
  CreateCertificateDto,
  UpdateCertificateDto,
  VerifyCertificateResponse,
} from "@/types/certificate-types";

const mapCertificate = (c: any): Certificate => ({
  _id: c._id,

  certificateNo: c.certificate_no,
  registrationNo: c.registration_no,

  verificationUrl: `https://verify.sultantracker.com/c/${c._id}`,

  company: {
    companyName: c.company,
    brandName: c.brand,
    licenseNo: c.license_no ?? "",
    hotline: c.hotline ?? "",
    website: c.website ?? "",
    email: c.email ?? "",
  },

  vehicle: {
    ownerName: c.owner_name,
    registrationNo: c.registration_no,
    vehicleType: c.vehicle_type,
    chassisNo: c.chassis_no,
    engineNo: c.engine_no,
    imei: c.imei,
    iccid: c.iccid,
    deviceModel: c.device_model,
    installationDate: c.installation_date,
    installer: c.installer,
  },

  validity: {
    issueDate: c.issue_date,
    validUntil: c.valid_until,
    gpsStatus: c.gps_status,
    deviceStatus: c.device_status,
    lastCommunication: c.last_communication ?? "",
  },

  verificationCount: c.verification_count,
  revoked: c.revoked,
  revokedAt: c.revoked_at,

  notes: c.notes,

  createdBy: c.created_by,

  createdAt: c.createdAt,
  updatedAt: c.updatedAt,
});

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5555";

// Create an axios instance
export const api = axios.create({
  baseURL: "/api/proxy", // 🔥 use proxy instead of backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically (if exists)
api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const UserAPI = {
  list: async (): Promise<User[]> => {
    const res = await api.get("/users");
    return res.data.map((u: any) => ({
      id: u._id, // 👈 map _id → id
      email: u.email,
      name: u.name,
      role: u.role,
      contact: u.contact,
      organization_name: u.organization_name,
      address: u.address,
      image: u.image,
      token: u.token,
      managerId: u.managerId,
    }));
  },

  adminUsers: async (
    page: number = 1,
    limit: number = 10,
    search: string = "",
  ) => {
    const res = await api.get("/users/admin", {
      params: {
        page,
        limit,
        search,
      },
    });

    return {
      data: res.data.data.map((u: any) => ({
        id: u._id,
        email: u.email,
        name: u.name,
        role: u.role,
        contact: u.contact,
        organization_name: u.organization_name,
        address: u.address,
        image: u.image,
        token: u.token,
        managerId: u.managerId,
      })),
      pagination: res.data.pagination,
    };
  },

  create: async (data: Partial<User> & { password: string }): Promise<User> => {
    const res = await api.post("/users/create", data);
    const u = res.data.user;
    return { ...u, id: u._id }; // 👈 normalize
  },

  update: async (id: string, data: Partial<User>): Promise<User> => {
    const res = await api.put(`/users/${id}`, data);
    const u = res.data.user;
    return { ...u, id: u._id }; // 👈 normalize
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  search: async (query: string): Promise<User[]> => {
    const res = await api.get(
      `/users/search?search=${encodeURIComponent(query)}`,
    );
    return res.data.map((u: any) => ({
      id: u._id,
      email: u.email,
      name: u.name,
      role: u.role,
      contact: u.contact,
      organization_name: u.organization_name,
      address: u.address,
      image: u.image,
      token: u.token,
      managerId: u.managerId,
    }));
  },

  registerFCMToken: async (token: string): Promise<void> => {
    await api.post("/users/update-token", { token });
  },
};

export const DeviceAPI = {
  getCurrentDevice: async (id: string): Promise<Device> => {
    const res = await api.get(`/devices/${id}`);
    return res.data;
  },
  assign: async (id: string, uid: string): Promise<Device> => {
    const res = await api.put(`/devices/${id}/assign`, { uid });
    return { ...res.data.device, id: res.data.device.id };
  },

  unassign: async (id: string): Promise<Device> => {
    const res = await api.put(`/devices/${id}/unassign`);
    return { ...res.data.device, id: res.data.device.id };
  },
};

export const AlertAPI = {
  fetchLastAlertsByIMEI: async (imei: string, limit = 50) => {
    const res = await api.get(`/alerts`, {
      params: { imei, limit },
    });
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    console.log("Deleting alert with ID:", id); // Debug log
    await api.delete(`/alerts/${id}`);
  },
};

export const RangsAlertAPI = {
  fetchLastAlertsByIMEI: async (imei: string, limit = 50) => {
    const res = await api.get(`/rangs-alerts`, {
      params: { imei, limit },
    });
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    console.log("Deleting alert with ID:", id); // Debug log
    await api.delete(`/rangs-alerts/${id}`);
  },
};

export const CommandAPI = {
  saveCommand: async (data: Omit<Command, "_id">): Promise<Command> => {
    const res = await api.post("/commands", data);
    return res.data;
  },

  generateBasicCommands: async (imei: string) => {
    const res = await api.post("/commands/generate-basic-command", {
      device_id: imei,
    });

    return res.data;
  },

  createCommand: async ({
    device_id,
    power,
  }: {
    device_id: string;
    power: string;
  }) => {
    const res = await api.post("/commands/create-single-command", {
      device_id: device_id,
      power: power,
    });

    return res.data;
  },

  fetchCommandsByIMEI: async (imei: string): Promise<Command[]> => {
    const res = await api.get(`/commands/${imei}`);
    return res.data;
  },
};

export const RangsCommandAPI = {
  saveCommand: async (data: Omit<Command, "_id">): Promise<Command> => {
    const res = await api.post("/rangs-commands", data);
    return res.data;
  },

  generateBasicCommands: async (imei: string) => {
    const res = await api.post("/rangs-commands/generate-basic-command", {
      device_id: imei,
    });

    return res.data;
  },

  createCommand: async ({
    device_id,
    power,
  }: {
    device_id: string;
    power: string;
  }) => {
    const res = await api.post("/rangs-commands/create-single-command", {
      device_id: device_id,
      power: power,
    });

    return res.data;
  },

  fetchCommandsByIMEI: async (imei: string): Promise<Command[]> => {
    const res = await api.get(`/rangs-commands/${imei}`);
    return res.data;
  },

  changeDevicePassword: async (data: { imei: string; password: string }) => {
    const res = await api.post("/devices/change-device-password", data);

    return res.data;
  },
};

export const PaymentAPI = {
  add_payment: async (data: {
    device_id: string;
    registration_number: string;
    customer_email: string;
    customer_number: string;
    service_charge: number;
    payment_method: string;
    year: number;
    month: number; // 0-11
  }): Promise<Payment> => {
    const res = await api.post("/retail_collections/add_payment", data);
    return res.data;
  },
  get_monthly_payment: async (
    data: MonthlyPaymentRequest,
  ): Promise<Payment[]> => {
    const res = await api.post("/retail_collections", data);
    return res.data;
  },

  update_payment: async (
    id: string,
    data: { payment_status: boolean; payment_method: string },
  ): Promise<Payment> => {
    const res = await api.put(`/retail_collections/${id}`, data);
    return res.data;
  },

  delete_payment: async (id: string): Promise<void> => {
    await api.delete(`/retail_collections/${id}`);
  },
};

export const CampaignApi = {
  startCampaign: async (
    data: {
      mobile_number: string;
      number_of_vehicle: number;
      amount: number;
    }[],
  ) => {
    const res = await api.post("/campaigns", data);
    return res.data;
  },

  getCampaigns: async () => {
    const res = await api.get("/campaigns");
    return res.data;
  },

  resetCampaign: async () => {
    const res = await api.post("/campaigns/reset");
    return res.data;
  },
};

export const SupportProblemAPI = {
  createSupportProblem: async (data: {
    device_id: string;
    sim_number: string;
    registration_number: string;
    platform: string;
    description: string;
  }) => {
    const res = await api.post("/support-problem", data);
    return res.data;
  },

  getSupportProblems: async () => {
    const res = await api.get("/support-problem");
    return res.data;
  },

  getSupportProblemById: async (id: string) => {
    const res = await api.get(`/support-problem/${id}`);
    return res.data;
  },
  updateSupportProblem: async (
    id: string,
    data: {
      device_id?: string;
      description?: string;
      platform?: string;
      sim_number?: string;
      registration_number?: string;
    },
  ) => {
    const res = await api.put(`/support-problem/${id}`, data);

    return res.data;
  },

  deleteSupportProblem: async (id: string) => {
    const res = await api.delete(`/support-problem/${id}`);

    return res.data;
  },
};

export const CertificateAPI = {
  /**
   * Certificate List
   */
  list: async (
    query: CertificateQuery = {},
  ): Promise<CertificateListResponse> => {
    const res = await api.get("/certificate", {
      params: query,
    });

    return {
      success: res.data.success,
      items: res.data.items.map(mapCertificate),
      pagination: res.data.pagination,
    };
  },

  /**
   * Get Single Certificate
   */
  getById: async (id: string): Promise<Certificate> => {
    const res = await api.get(`/certificate/${id}`);

    return mapCertificate(res.data.data);
  },

  /**
   * Create Certificate
   */
  create: async (data: CreateCertificateDto): Promise<Certificate> => {
    const payload = {
      owner_name: data.ownerName,
      registration_no: data.registrationNo,
      vehicle_type: data.vehicleType,

      chassis_no: data.chassisNo,
      engine_no: data.engineNo,

      imei: data.imei,
      iccid: data.iccid,

      device_model: data.deviceModel,

      installation_date: data.installationDate,
      installer: data.installer,

      issue_date: data.issueDate,
      valid_until: data.validUntil,

      gps_status: data.gpsStatus,
      device_status: data.deviceStatus,

      notes: data.notes,
    };

    const res = await api.post("/certificate", payload);

    return mapCertificate(res.data.data);
  },

  /**
   * Update Certificate
   */
  update: async (
    id: string,
    data: UpdateCertificateDto,
  ): Promise<Certificate> => {
    const res = await api.patch(`/certificate/${id}`, data);

    return mapCertificate(res.data.data);
  },

  /**
   * Delete Certificate
   */
  remove: async (id: string): Promise<void> => {
    await api.delete(`/certificate/${id}`);
  },

  /**
   * Revoke Certificate
   */
  revoke: async (id: string): Promise<Certificate> => {
    const res = await api.patch(`/certificate/${id}/revoke`);

    return mapCertificate(res.data.data);
  },

  /**
   * Print Certificate
   */
  print: async (id: string): Promise<Certificate> => {
    const res = await api.get(`/certificate/${id}/print`);

    return mapCertificate(res.data.data);
  },

  /**
   * Public Verification
   */
  verify: async (certificateNo: string): Promise<VerifyCertificateResponse> => {
    const res = await api.get(`certificate/verify/${certificateNo}`);

    return {
      success: res.data.success,
      verified: res.data.verified,
      data: res.data.data ? mapCertificate(res.data.data) : undefined,
      message: res.data.message,
    };
  },
};
