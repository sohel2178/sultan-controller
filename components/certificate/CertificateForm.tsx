"use client";

import { UseFormReturn } from "react-hook-form";
import { CalendarIcon, Cpu, User, Car, Wrench } from "lucide-react";

import {
  CertificateFormValues,
  deviceStatusEnum,
  gpsStatusEnum,
} from "@/lib/certificate-schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateCertificateDto } from "@/types/certificate-types";

// import { CertificateFormValues } from "@/lib/certificate-schema";

interface CertificateFormProps {
  form: UseFormReturn<CreateCertificateDto>;
  loading?: boolean;
  submitText?: string;
  onSubmit: (values: CreateCertificateDto) => void | Promise<void>;
}

export default function CertificateForm({
  form,
  loading = false,
  submitText = "Create Certificate",
  onSubmit,
}: CertificateFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Owner */}

        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-orange-500" />
            <h2 className="font-semibold text-lg">Owner Information</h2>
          </div>

          <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Name</FormLabel>

                <FormControl>
                  <Input placeholder="Owner Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* Vehicle */}

        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-orange-500" />
            <h2 className="font-semibold text-lg">Vehicle Information</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field form={form} name="registrationNo" label="Registration No." />

            <Field form={form} name="vehicleType" label="Vehicle Type" />

            <Field form={form} name="chassisNo" label="Chassis No." />
          </div>
        </section>

        {/* Device */}

        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-orange-500" />
            <h2 className="font-semibold text-lg">Device Information</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field form={form} name="imei" label="IMEI" />

            <Field form={form} name="deviceModel" label="Device Model" />

            <Field form={form} name="installer" label="Installer" />
          </div>
        </section>

        {/* Dates */}

        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-orange-500" />
            <h2 className="font-semibold text-lg">Certificate Validity</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <DateField
              form={form}
              name="installationDate"
              label="Installation Date"
            />

            <DateField form={form} name="issueDate" label="Issue Date" />

            <DateField form={form} name="validUntil" label="Valid Until" />
          </div>
        </section>

        {/* Status */}

        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-orange-500" />
            <h2 className="font-semibold text-lg">Status</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              form={form}
              name="gpsStatus"
              label="GPS Status"
              values={gpsStatusEnum.options}
            />

            <SelectField
              form={form}
              name="deviceStatus"
              label="Device Status"
              values={deviceStatusEnum.options}
            />
          </div>
        </section>

        {/* Notes */}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>

              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Additional Notes..."
                  {...field}
                />
              </FormControl>

              <FormDescription>Optional</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : submitText}
        </Button>
      </form>
    </Form>
  );
}

function Field({ form, name, label }: any) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: any) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function DateField({ form, name, label }: any) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: any) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input type="date" {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function SelectField({ form, name, label, values }: any) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: any) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {values.map((v: string) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
