class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postPlaylistHandler(req, h) {
    try {
      this._validator.validatePlaylistsPayload(req.payload);

      const { name } = req.payload;

      const { id: credentialId } = req.auth.credentials;

      const playlistId = await this._service.addPlaylist({
        name,
        owner: credentialId,
      });
      return h.response({
        status: 'success',
        massage: 'Playlist berhasil ditambahkan',
        data: {
          playlistId,
        },
      }).code(201);
    } catch (error) {
      return error;
    }
  }

  async getPlaylistHandler(req, h) {
    try {
      const { id: credentialId } = req.auth.credentials;

      const playlists = await this._service.getPlaylists(credentialId);
      return {
        status: 'success',
        data: { playlists },
      };
    } catch (error) {
      return error;
    }
  }

  async deletePlaylistHandler(req, h) {
    try {
      const { playlistId } = req.params;
      const { id: credentialId } = req.auth.credentials;

      await this._service.verifyPlaylistOwner(playlistId, credentialId);
      await this._service.deletePlaylist(credentialId);

      return {
        status: 'success',
        message: 'Playlist berhasil dihapus',
      };
    } catch (error) {
      return error;
    }
  }
}

module.exports = PlaylistsHandler;
