import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { createProductDto } from "./dto/create-product.dto";
import { UserIdentity } from "src/get-user.decorator";
import { Public } from "src/public.decorator";
import { UserPayloadDto } from "src/user/dto/userPayload.dto";
import { SearchProductDto } from "./dto/search-product.dto";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@UserIdentity() user: UserPayloadDto) {
    return this.productService.findAll(user);
  }

  @Public()
  @Get(":id")
  getProduct(@Param("id", new ParseIntPipe()) id: number) {
    return this.productService.findOne(id);
  }

  @Post("add")
  @UseInterceptors(FilesInterceptor("photos", 8, {}))
  async addProduct(
    @Body() data: createProductDto,
    @UserIdentity() user: UserPayloadDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: "image" })],
      })
    )
    photos: Array<Express.Multer.File>
  ) {
    return this.productService.addProduct(data, user, photos);
  }

  @Public()
  @Post("rate/:id")
  async rateProduct(
    @Param("id", new ParseIntPipe()) productId: number,
    @Body("rate", new ParseIntPipe()) rate: number
  ) {
    return this.productService.rateProduct(productId, rate);
  }

  @Delete(":id")
  delete(
    @Param("id", new ParseIntPipe()) id: number,
    @UserIdentity() user: UserPayloadDto
  ) {
    return this.productService.deleteProduct(id, user);
  }

  @Public()
  @Post("search")
  searchProduct(@Body() data: SearchProductDto) {
    return this.productService.searchProduct(data.title);
  }
}
