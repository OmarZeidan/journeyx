import { useConvexMutation } from "@convex-vue/core";
import { api } from "../../convex/_generated/api";
import type { Doc, Id } from "../../convex/_generated/dataModel";

export function useTourMutation() {
  const { mutate: addNewTour, isLoading: isAddTourLoading } = useConvexMutation(
    api.tours.createNew,
  );

  const { mutate: updateTour, isLoading: isUpdateTourLoading } = useConvexMutation(
    api.tours.updateTour,
  );

  const onAddNewTour = async (tour: Omit<Doc<"tours">, "_id" | "_creationTime">) => {
    await addNewTour({
      name: tour.name,
      location_from: tour.location_from,
      location_to: tour.location_to,
      date: tour.date,
      driver: tour.driver as Id<"drivers">,
    });
  };

  const onUpdateTour = async (tour: Omit<Doc<"tours">, "_creationTime">) => {
    const { _id, driver, ...rest } = tour;
    updateTour({
      id: _id,
      driver: driver as Id<"drivers">,
      ...rest,
    });
  };

  return {
    onAddNewTour,
    onUpdateTour,
    isAddTourLoading,
    isUpdateTourLoading,
  };
}
