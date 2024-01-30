import { useCallback } from "react";
import { getHolderDocuments } from "./../store/holders/holderDocumentSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getOwnerDocuments } from "../store/owners/ownerDocumentSlice";

export const useGetDocuments = () => {
  const dispatch = useDispatch<AppDispatch>();

  const holderDocuments = useCallback(
    async (docNum: string) => {
      return await dispatch(getHolderDocuments(docNum)).unwrap();
    },
    [dispatch]
  );

  const ownerDocuments = useCallback(
    async (docNum: string) => {
      return await dispatch(getOwnerDocuments(docNum)).unwrap();
    },
    [dispatch]
  );

  return { holderDocuments, ownerDocuments };
};