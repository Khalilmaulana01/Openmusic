const routes = (handler) => [
  {
    method: 'POST',
    path: '/exports/playlist/{playlistId}',
    handler: handler.postExportPlaylistHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
];

module.exports = routes;
