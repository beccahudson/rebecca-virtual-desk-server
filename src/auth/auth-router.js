const express = require("express");
const AuthService = require("./auth-service");

const authRouter = express.Router();

authRouter.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  const loginUser = { email, password };

  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });

  AuthService.getUserWithEmail(req.app.get("db"), loginUser.email)
    .then((dbUser) => {
      if (!dbUser)
        return res.status(400).json({
          error: "Incorrect user_name or password",
        });
      return AuthService.comparePasswords(
        loginUser.password,
        dbUser.password,
        (compareMatch) => {
          if (!compareMatch)
            return res.status(400).json({
              error: "Incorrect user_name or password",
            });
          const sub = dbUser.email;
          const payload = { user_id: dbUser.id };
          res.send({
            authToken: AuthService.createJwt(sub, payload),
          });
        }
      );
    })
    .catch(next);
});

module.exports = authRouter;
