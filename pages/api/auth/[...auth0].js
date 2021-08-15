import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import { createUser } from "../../../utils/db";

const afterCallback = async (req, res, session, state) => {

  try {
    await createUser(session.user.email);
  } catch (err) {
    console.log(err);
  }

  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
