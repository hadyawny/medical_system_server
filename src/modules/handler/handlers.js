import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

export const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    !document && res.status(404).json({ message: "document not found" });
    document && res.json({ message: "success", document });
  });
};


export const getSingleOne = (model, populateFields = []) => {
  return catchError(async (req, res, next) => {

    let query = model.findById(req.params.id);
    if (populateFields.length > 0) {
      populateFields.forEach(field => query = query.populate(field));
    }

    let apiFeatures = new ApiFeatures(query, req.query)
    .fields()
    .filter()
    .pagination()
    .search()
    .sort();

  let document = await apiFeatures.mongooseQuery;

    !document && res.status(404).json({ message: "document not found" });
    document && res.json({ message: "success", document });
  });
};

export const getAllOne = (model, populateFields = []) => {
  return catchError(async (req, res, next) => {


    let query = model.find();
    if (populateFields.length > 0) {
      populateFields.forEach(field => query = query.populate(field));
    }

    let apiFeatures = new ApiFeatures(query, req.query)
      .fields()
      .filter()
      .pagination()
      .search()
      .sort();

    let document = await apiFeatures.mongooseQuery;

    !document && res.status(404).json({ message: "document not found" });
    document && res.json({ message: "success",page: apiFeatures.pageNumber, document });
  });
};
