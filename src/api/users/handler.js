// const ClientError = require('../../exceptions/ClientError');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(req, h) {
    try {
      this._validator.validateUserPayload(req.payload);
      const { username, password, fullname } = req.payload;

      const userId = await this._service.addUser({ username, password, fullname });

      return h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      }).code(201);
    } catch (error) {
      return error;
    }
  }

  async getUserByIdHandler(req, h) {
    try {
      const { id } = req.params;
      const user = await this._service.getUserById(id);

      return {
        status: 'succees',
        data: {
          user,
        },
      };
    } catch (error) {
      return error;
    }
  }
}

module.exports = UsersHandler;
