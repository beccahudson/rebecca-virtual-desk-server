const path = require('path')
const express = require('express');
const xss = require('xss');
const ChatsService = require('./chat-service');

const chatsRouter = express.Router();
const jsonParser = express.json();

const serializeChat = chat_comments => ({
    id: chat_comments.id,
    content: xss(chat_comments.content),
    ticket_id: chat_comments.ticket_id,
    author_id: chat_comments.author_id,
    date_commented: chat_comments.date_commented,
})

chatsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ChatsService.getAllChats(knexInstance)
      .then(chats => {
        res.json(chats.map(serializeChat))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { content, ticket_id, author_id } = req.body
    const newChat = { content, ticket_id, author_id }

    for (const [key, value] of Object.entries(newChat))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    // newChat.date_commented = date_commented;

    ChatsService.createChat(
      req.app.get('db'),
      newChat
    )
      .then(chat => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${chat.id}`))
          .json(serializeChat(chat))
      })
      .catch(next)
  })

  chatsRouter
  .route('/:chat_id')
  .all((req, res, next) => {
    ChatsService.getById(
      req.app.get('db'),
      req.params.chat_id
    )
      .then(chat => {
        if (!chat) {
          return res.status(404).json({
            error: { message: `Chat doesn't exist` }
          })
        }
        res.chat = chat
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeChat(res.chat))
  })
  
  
module.exports = chatsRouter
