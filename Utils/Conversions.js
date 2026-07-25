/**
 * @param {number} number
 * @returns {string}
 */
export function toHex(number){
  return (number).toString(16).padStart(2,'0')
}


/**
 * 
 * @param {string} s 
 * @returns {number[]}
 */
export function toRGBA(s){
  const p = [0,0,0,0];
  if(s==null)return p;
  p[0] = parseInt(s.substring(1,3), 16);
  p[1] = parseInt(s.substring(3,5), 16);
  p[2] = parseInt(s.substring(5,7), 16);
  p[3] = parseInt(s.substring(7,9), 16);
  return p;
}


/*
 
toHex(rgba)
fromHex(hex)

toRGB(hex)
toRGBA(hex)

toHSV(rgba)
fromHSV(hsv)

toHSL(rgba)
fromHSL(hsl)

toCSS(rgba)       // "rgba(255,0,0,0.5)"
fromCSS(css)
  
*/