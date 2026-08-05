import { alphaBlend, colorSimilarity, mix } from "../Utils/BlendModes.js";
import { toRGBA } from "../Utils/Conversions.js";

export class ToolsService{


  static pixelDocument;
  
  
  static brushService(pixelList, prop){
    const pixels = pixelList.actionList.pixels;
    const props= prop;
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

  static bucketFillService(x,y, prop){
    const precision = prop.precision;
    const mix_val = prop.mix;
    const color = prop.color;

    const MINX = 0;
    const MINY = 0;
    const WIDTH = ToolsService.pixelDocument.getWidth();
    const HEIGHT =  ToolsService.pixelDocument.getHeight()

    const first_color = ToolsService.pixelDocument.getColor(x,y);

    const pixels = [];

    const visited = new Uint8Array(WIDTH * HEIGHT);

    const stack = [y * WIDTH + x];

    while(stack.length){
      const index = stack.pop();

      const px = index % WIDTH;
      const py = Math.floor(index / WIDTH);

      if(visited[index]){ continue }

      const color_in = ToolsService.pixelDocument.getColor(px,py);
      const similarity = colorSimilarity(first_color, color_in, true)

      if(similarity < precision){
        continue;
      }
      visited[index] = 1;
      pixels.push({
        x: px,
        y: py,
        before: color_in,
        after: mix(color_in, color, mix_val)
      })
      
      if(px-1 >= MINX ) stack.push(index-1); //left
      if(px+1 < WIDTH) stack.push(index+1); //right
      if(py-1 >= MINY) stack.push(index-WIDTH); // up
      if(py+1 < HEIGHT) stack.push(index+WIDTH); // bottom

      
    }

    return pixels;

  }

  
} 