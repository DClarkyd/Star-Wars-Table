import { useMutation } from "react-query";

const useAddFavorite = () =>
  useMutation((character) => {
    character.favorite = !character.favorite;
    // return fetch(`/api/v1/vehicles/${vehicle.id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(vehicle),
    // });
  });

  export default useAddFavorite