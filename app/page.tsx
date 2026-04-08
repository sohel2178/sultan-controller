"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isLoggedIn } from "@/lib/auth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    } else {
      router.replace("/alerts"); // 👈 THIS IS THE FIX
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return null;
}
