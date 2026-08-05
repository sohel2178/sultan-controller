"use client";

import { useCallback, useEffect, useState } from "react";
import { FileCheck2 } from "lucide-react";

import {
  Certificate,
  CertificateListResponse,
} from "@/types/certificate-types";

import { CertificateAPI } from "@/lib/api";

import CertificateToolbar from "@/components/certificate-main/CertificateToolbar";
import CertificateTable from "@/components/certificate-main/CertificateTable";
import CertificateSkeleton from "@/components/certificate-main/CertificateSkeleton";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CertificatePage() {
  const [loading, setLoading] = useState(true);

  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const [pagination, setPagination] = useState<
    CertificateListResponse["pagination"]
  >({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  const handleDeleteClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setDeleteOpen(true);
  };

  const handleDeleteSuccess = () => {
    setDeleteOpen(false);
    setSelectedCertificate(null);

    loadCertificates();
  };

  const loadCertificates = useCallback(async () => {
    try {
      setLoading(true);

      const res = await CertificateAPI.list({
        page,
        limit,
        search,
        status: status === "ALL" ? undefined : (status as any),
      });

      setCertificates(res.items);

      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, status]);

  useEffect(() => {
    loadCertificates();
  }, [loadCertificates]);

  function changeSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function changeStatus(value: string) {
    setStatus(value);
    setPage(1);
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
          <FileCheck2 className="h-6 w-6 text-orange-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">Certificate Management</h1>

          <p className="text-muted-foreground">
            Generate, manage and verify GPS Compliance Certificates.
          </p>
        </div>
      </div>

      {/* Toolbar */}

      <CertificateToolbar
        loading={loading}
        search={search}
        status={status}
        onRefresh={loadCertificates}
        onSearchChange={changeSearch}
        onStatusChange={changeStatus}
      />

      {/* Table */}

      {loading ? (
        <CertificateSkeleton />
      ) : (
        <CertificateTable
          certificates={certificates}
          page={page}
          limit={limit}
          onDeleted={loadCertificates}
        />
      )}

      {/* Pagination */}

      {!loading && pagination.pages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();

                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              />
            </PaginationItem>

            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
              .filter((p) => {
                if (pagination.pages <= 7) return true;

                if (p === 1) return true;

                if (p === pagination.pages) return true;

                if (Math.abs(page - p) <= 1) return true;

                return false;
              })
              .map((p, index, arr) => {
                const previous = arr[index - 1];

                const gap = previous !== undefined && p - previous > 1;

                return (
                  <>
                    {gap && (
                      <PaginationItem key={`gap-${p}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={page === p}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(p);
                        }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                );
              })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();

                  if (page < pagination.pages) {
                    setPage(page + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
