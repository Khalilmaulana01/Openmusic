const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insert_at,
  update_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: insert_at,
  updatedAt: update_at,
});

module.exports = { mapDBToModel };
