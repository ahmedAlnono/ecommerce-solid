import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream } from "fs";
import { join } from "path";
import { Public } from "src/public.decorator";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Public()
  @Post("upload")
  @UseInterceptors(FileInterceptor("photos", {}))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000000 }),
          new FileTypeValidator({ fileType: "image" }),
        ],
      }),
    )
    photos: Express.Multer.File[],
  ) {
    return photos;
  }

  @Public()
  @Get("get/:id")
  getFile(@Param("id") id: string) {
    // const fileName = '795bbd8415c063293111e36315eac5fe';
    const file = createReadStream(
      join(process.cwd(), `src/files/uploads/${id}`),
    );
    return new StreamableFile(file);
  }

  @Public()
  @Get("avatar/:id")
  getUserPhoto(@Param("id", new ParseIntPipe()) id: number) {
    return "";
  }
}
