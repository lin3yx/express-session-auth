import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  // req.session.isAuth = true;
  // console.log(req.session);
  // console.log(req.session.id);

  if (req.session.viewCount) {
    req.session.viewCount += 1;
  } else {
    req.session.viewCount = 1;
  }

  res.send(
    `<h1>You have visited this page ${req.session.viewCount} times.</h1>`
  );
});

export default router;
