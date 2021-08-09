const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(req, h) {
    try {
      this._validator.validateSongsPayload(req.payload);
      const {
        title,
        year,
        performer,
        genre,
        duration,
      } = req.payload;

      const songId = await this._service.addSong({
        title,
        year,
        performer,
        genre,
        duration,
      });

      return h
        .response({
          status: 'success',
          message: 'Lagu berhasil ditambahkan',
          data: {
            songId,
          },
        })
        .code(201);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }
      //! Server ERROR
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }

  async getSongsHandler(req, h) {
    try {
      const songsData = await this._service.getSongs();
      const songs = [];
      songsData.forEach((e) => {
        songs.push({
          id: e.id,
          title: e.title,
          performer: e.performer,
        });
      });

      return {
        status: 'success',
        data: { songs },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      //! Server ERROR
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }

  async getSongByIdHandler(req, h) {
    try {
      const { id } = req.params;
      const song = await this._service.getSongById(id);
      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }
      //! Server ERROR
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }

  async putSongByIdHandler(req, h) {
    try {
      this._validator.validateSongsPayload(req.payload);
      const { id } = req.params;
      await this._service.putSongById(id, req.payload);

      return {
        status: 'success',
        message: 'Lagu berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        })
          .code(error.statusCode);
      }

      //! Server ERROR
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }

  async deleteSongByIdHandler(req, h) {
    try {
      const { id } = req.params;
      await this._service.deleteSongById(id);
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }
      //! Server ERROR
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }
}

module.exports = SongsHandler;
