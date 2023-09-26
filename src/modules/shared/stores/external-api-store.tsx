import { IFindAddressResult } from "@shared/interfaces/find-address-result.interface";
import { ExternalApiService } from "@shared/services";
import { create } from "zustand";

interface useExternalApiStoreProps {
  findAddress: (cep: string) => Promise<IFindAddressResult | null>;
}

export const useExternalApiStore = create<useExternalApiStoreProps>((set) => ({
  findAddress: (cep: string) => ExternalApiService.findAddress(cep),
}));
