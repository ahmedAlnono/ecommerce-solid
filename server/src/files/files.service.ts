import { Inject, Injectable, StreamableFile } from "@nestjs/common";
import { USER_MODEL } from "constants/constants";
import { createReadStream } from "fs";
import { join } from "path";
import { User } from "src/models/user.model";

// import { PRODUCT_MOEL } from "constants/constants";
// import { Product } from "src/models/product.model";
// import { createProductDto } from "src/product/dto/create-product.dto";

@Injectable()
export class FilesService {
  constructor(@Inject(USER_MODEL) private user: typeof User) { }

  async getUserPhoto(id: number) {
    const photo = await this.user.findByPk(id, {
      attributes: ["photo"],
    });

    const userPhoto = createReadStream(
      join(process.cwd(), `src/files/uploads/${photo}`),
    );
    return new StreamableFile(userPhoto);
  }
}
