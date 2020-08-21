const ChatService = {
    getAllChats(db) {
      return db
        .select('*')
        .from('chat_comments')
    },
  
    createChat(db, newChat) {
      return db
        .insert(newChat)
        .into('chat_comments')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(db, id) {
      return db
        .from('chat_comments')
        .select('*')
        .where('id', id)
        .first()
    }
  
    // deleteComment(db, id) {
    //   return knex('chat_comments')
    //     .where({ id })
    //     .delete()
    // },
  
    // updateComment(db, id, newCommentFields) {
    //   return knex('chat_comments')
    //     .where({ id })
    //     .update(newCommentFields)
    // },
  }
  
  module.exports = ChatService