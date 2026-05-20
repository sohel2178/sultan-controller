import { Command } from "@/types/command";
import { Payment } from "@/types/payment";
import { MonthlyPaymentRequest } from "@/types/report";
import axios from "axios";

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
