const { errorHandler } = require('../../utils');

class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this._postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(req, h) {
    try {
      const { data } = req.payload;

      this._service.validateImageHeaders(data.hapi.headers);

      const pictureUrl = await this._service.writeFile(data, data.hapi);

      return h.response({
        status: 'success',
        data: {
          pictureUrl,
        },
      }).code(201);
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = UploadsHandler;
