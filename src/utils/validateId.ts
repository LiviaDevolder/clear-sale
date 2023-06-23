import mongoose from "mongoose"
import { ApiError } from "./ApiError"
import httpStatus from "http-status"

export const validateId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, `Invalid id`)
  }
}