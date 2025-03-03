import {Router} from "express"
import {allpets, create, deletepet, ownerpet} from "../controllers/product.controller.js"
import upload from "../middleware/upload.js";

const router = Router()

router.post("/create", upload.single("image"), create);
// router.route("/create").post(create)
router.route("/getmypet").get(ownerpet)
router.route("/allpet").get(allpets)


router.route("/:id").delete(deletepet)

export default router