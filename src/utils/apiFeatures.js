export class ApiFeatures {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }

  pagination() {
    if (this.searchQuery.page <= 0) this.searchQuery.page = 1;
    let pageNumber = this.searchQuery.page * 1 || 1;
    let pageLimit = 10;
    let skip = (pageNumber - 1) * pageLimit;
    this.pageNumber = pageNumber;
    this.mongooseQuery.skip(skip).limit(pageLimit);
    return this;
  }

  filter() {
    let filterObj = { ...this.searchQuery };
    let excludedFields = ["page", "sort", "fields", "keyword"];
  
    // Exclude fields that are not meant for filtering
    excludedFields.forEach((val) => {
      delete filterObj[val];
    });
  
    // Stringify the filter object
    filterObj = JSON.stringify(filterObj);
  
    // Ensure the replacement only happens for operators, not field names
    filterObj = filterObj.replace(/\b(gt|gte|lt|lte)\b/g, (match) => "$" + match);
  
    // Parse the stringified filter object back into an object
    filterObj = JSON.parse(filterObj);

  
    // Apply the filter object to the Mongoose query
    this.mongooseQuery.find(filterObj);
    return this;
  }
  
  

  sort() {
    if (this.searchQuery.sort) {
      let sortBy = this.searchQuery.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortBy);
    }

    return this;
  }

  search() {
    if (this.searchQuery.keyword) {
      this.mongooseQuery.find({
        $or: [
          { name: { $regex: this.searchQuery.keyword } },
          { specialties: { $regex: this.searchQuery.keyword } },
          { role: { $regex: this.searchQuery.keyword } },
          { drSpecialties: { $regex: this.searchQuery.keyword } },
          { email: { $regex: this.searchQuery.keyword } },





        ],
      });
    }
    return this;
  }

  fields() {
    if (this.searchQuery.fields) {
      let fields = this.searchQuery.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }

    return this;
  }
}
