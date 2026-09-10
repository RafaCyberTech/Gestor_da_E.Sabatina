-- Apenas para uma base Supabase já existente.
-- Guarda a conta autora de cada mensagem para a autorização não depender do nome.

ALTER TABLE messages ADD COLUMN IF NOT EXISTS sender_user_id TEXT;

UPDATE messages AS m
SET sender_user_id = u.id
FROM users AS u
WHERE m.sender_user_id IS NULL
  AND m.from_role = 'member'
  AND u.role = 'member'
  AND u.name = m.from_name
  AND (SELECT COUNT(*) FROM users ux WHERE ux.role = 'member' AND ux.name = m.from_name) = 1;

CREATE INDEX IF NOT EXISTS messages_sender_user_id_idx ON messages(sender_user_id);
