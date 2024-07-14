const { startSession } = require('mongoose');
const { flattenObject } = require('./util');

class Abstract {
  constructor(model) {
    this.model = model;
  }

  getModel = () => this.model;

  populate = (query) => query;

  get = async (id, populate) => {
    const query = this.model.findById(id);

    const populated = populate ? this.populate(query) : query;
    const result = await populated.lean();

    return result;
  };

  count = () => this.model.count();
  findOrigin = (o) => this.model.find(o);
  findOneAndUpdate = (f, u) => this.model.findOneAndUpdate(f, u);
  find = async (
    filter,
    field = 'createdAt',
    order = 'descending',
    limit,
    populate,
    skip,
    select
  ) => {
    let query = this.model
      .find(filter)
      .select(select) // Add only certain field filter
      // @ts-ignore
      .sort({ [field]: order, createdAt: 'descending' });
    if (skip) {
      query = query.skip(skip);
    }

    if (skip) {
      query = query.skip(skip);
    }

    if (limit) {
      query = query.limit(limit);
    }

    query = populate ? this.populate(query) : query;

    return await query.lean();
  };

  create = async (payload) => {
    const doc = await this.model.create(payload);

    const query = this.model.findById(doc._id);

    const result = await query.lean();

    return result;
  };

  update = async (
    id,
    payload,
    overwrite
  ) => {
    const payloadSet = overwrite ? payload : flattenObject(payload);

    await this.model.findByIdAndUpdate(id, payloadSet).exec();

    const query = this.model.findById(id);

    const result = await query.lean();

    return result;
  };

  updateWhere = async (
    where,
    payload,
    overwrite
  ) => {
    const payloadSet = overwrite ? payload : flattenObject(payload);

    return this.model.updateMany(where, payloadSet).exec();
  };

  removeWhere = async (where) =>
    this.model.deleteMany(where);

  remove = async (_id) =>
    await this.model.deleteOne({ _id });

  validate = () => {
    return true;
  };

  paginatedFind = async (
    filter,
    field = 'createdAt',
    order = 'descending',
    limit,
    populate,
    skip
  ) => {
    return Promise.all([
      this.model.count(filter),
      this.find(filter, field, order, limit, populate, skip)
    ]);
  };
}

module.exports = Abstract;

