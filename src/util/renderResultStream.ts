import { ImageResult, Images, ImageStream } from "../config/types";

const renderResultStream = (images: Images): ImageStream => {
  const imagesToRender = JSON.parse(JSON.stringify(images));
  const resultStream: ImageStream = [];
  while (Object.keys(imagesToRender).length) {
    const searchTerms: Array<string> = Object.keys(imagesToRender);
    const searchTerm =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];
    const searchTermImages: ImageStream = imagesToRender[searchTerm];
    const imageIndex = Math.floor(Math.random() * searchTermImages.length);
    const imageToRender: ImageResult = searchTermImages.splice(
      imageIndex,
      1
    )[0];
    resultStream.push(imageToRender);
    if (!searchTermImages.length) {
      delete imagesToRender[searchTerm];
    }
  }
  return resultStream;
};

export default renderResultStream;
