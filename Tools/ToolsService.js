import { alphaBlend, mix } from "../Utils/BlendModes.js";
import { toRGBA } from "../Utils/Conversions.js";

export class ToolsService{


  static pixelDocument;
  // constructor(pixeldocument){
    // pixelDocument = pixeldocument;
   
    // if (new.target === ToolsService) {
    //   throw new TypeError("Cannot instantiate an abstract class directly.");
    // }
  // }

  static brushService(pixelList, prop){
    const pixels = pixelList.actionList.pixels;
    const props= prop;
    console.log(prop)
    for(let i =0; i < pixels.length;i++){
      const x = pixels[i].x;
      const y = pixels[i].y;

      pixels[i].before = ToolsService.pixelDocument.getColor(x,y);
      let result = toRGBA(props.color);
      if(props.merge){
        result = alphaBlend(pixels[i].before, result);
      }
      pixels[i].after = result;

    }

  }

  static eraserService(pixelList, prop){
    const pixels = pixelList.actionList.pixels;
    const props = prop;
    for(let i =0; i < pixels.length;i++){
      const x = pixels[i].x;
      const y = pixels[i].y;
      pixels[i].before = ToolsService.pixelDocument.getColor(x,y);
      const result = mix(pixels[i].before, [0,0,0,0], props.strength);
      pixels[i].after = result;

    }


  }

  
} 