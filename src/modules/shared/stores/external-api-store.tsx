import { IFindAddressResult } from "../interfaces/find-address-result.interface";
import { ExternalApiService } from "../services";
import { create } from "zustand";

interface useExternalApiStoreProps {
  findAddress: (cep: string) => Promise<IFindAddressResult | null>;
}

export const useExternalApiStore = create<useExternalApiStoreProps>((set) => ({
  findAddress: (cep: string) => ExternalApiService.findAddress(cep),
}));
