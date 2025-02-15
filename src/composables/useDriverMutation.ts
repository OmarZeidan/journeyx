import { useConvexMutation } from "@convex-vue/core";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";

export function useDriverMutation() {
  const { mutate: addNewDriver, isLoading: isAddDriverLoading } = useConvexMutation(
    api.drivers.createNew,
  );

  const { mutate: updateDriver, isLoading: isUpdateDriverLoading } = useConvexMutation(
    api.drivers.updateDriver,
  );

  const { mutate: removeDriver } = useConvexMutation(api.drivers.deleteDriver);

  const submitManageDriver = async (
    form: { name: string; location: string },
    driver?: Doc<"drivers">,
  ) => {
    if (!driver?._id) {
      await addNewDriver({ name: form.name, location: form.location });
    } else {
      await updateDriver({
        id: driver._id,
        name: form.name,
        location: form.location,
      });
    }
  };

  return {
    submitManageDriver,
    isAddDriverLoading,
    isUpdateDriverLoading,
    removeDriver,
  };
}
