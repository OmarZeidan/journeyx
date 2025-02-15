import { useConvexQuery } from "@convex-vue/core";
import { api } from "@cvx/_generated/api";

export function useDriver() {
  const { data, isLoading, error } = useConvexQuery(api.drivers.get, {});
  return {
    drivers: data,
    isDriversLoading: isLoading,
    driversFetchError: error,
  };
}
