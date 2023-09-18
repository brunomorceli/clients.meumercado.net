import { useEffect, useState } from "react";
import { IProduct, IProductSearch } from "@/interfaces";
import { useStore } from "zustand";
import { useProductStore } from "@/stores/product.store";
import { AuthGuard, Search } from "@/components";
import { Products } from "@/components/Products";

export default function ProductListPage() {
  return (
    <AuthGuard>
      <Products />
    </AuthGuard>
  );
}
