const conflict = () => Object.assign(new Error('Conditional write failed'), { name: 'ConditionalCheckFailedException' });
export function createD1Store(db) {
  return {
    async get(pk, sk) {
      const row = await db.prepare('SELECT document FROM records WHERE pk = ?1 AND sk = ?2').bind(pk, sk).first();
      return row ? JSON.parse(row.document) : undefined;
    },
    async put(item) { return this.save(item, null); },
    async save(item, expected) {
      const { pk, sk } = item;
      const version = item.version || 0;
      const document = JSON.stringify(item);
      const statement = expected === null
        ? db.prepare('INSERT INTO records (pk, sk, version, document) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(pk, sk) DO NOTHING').bind(pk, sk, version, document)
        : db.prepare('UPDATE records SET version = ?3, document = ?4 WHERE pk = ?1 AND sk = ?2 AND version = ?5').bind(pk, sk, version, document, expected);
      const result = await statement.run();
      if (result.meta.changes !== 1) throw conflict();
    },
    async remove(pk, sk, expected) {
      const statement = expected === undefined
        ? db.prepare('DELETE FROM records WHERE pk = ?1 AND sk = ?2').bind(pk, sk)
        : db.prepare('DELETE FROM records WHERE pk = ?1 AND sk = ?2 AND version = ?3').bind(pk, sk, expected);
      const result = await statement.run();
      if (expected !== undefined && result.meta.changes !== 1) throw conflict();
    },
    async query(pk) {
      const { results } = await db.prepare('SELECT document FROM records WHERE pk = ?1 ORDER BY sk LIMIT 1001').bind(pk).all();
      if (results.length > 1000) throw new Error('Collection exceeds response limit');
      return results.map(row => JSON.parse(row.document));
    },
  };
}
