const pg = require("pg");

const db = new pg.Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  // port: process.env.DB_PORT,
});

async function deleteRecord() {
  const sql = `DELETE FROM decks WHERE name = 'Test Deck'`;
  const result = await db.query(sql);

  if (result.rowCount === 1) {
    console.log("Record deleted successfully");
  } else {
    console.log("Record not found");
  }
}

deleteRecord();
