import { useMutation } from "react-query";

const useAddFavorite = () =>
  useMutation((character) => {
    character.favorite = !character.favorite;
  });

export default useAddFavorite;
